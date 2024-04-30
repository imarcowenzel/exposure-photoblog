import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import db from "@/lib/db";
import { logInSchema } from "@/schemas";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_ID!,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_ID!,
      clientSecret: process.env.NEXTAUTH_GITHUB_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        let user = null;

        const validate = logInSchema.safeParse(credentials);

        if (!validate.success) {
          throw new Error("Email and password required.");
        }

        const { email, password } = validate.data;

        try {
          user = await db.user.findUnique({
            where: { email },
          });

          if (!user || !user.hashedPassword) {
            throw new Error("User doest no exist.");
          }

          const isCorrectPassword = await bcrypt.compare(
            password,
            user?.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error("Incorrect password.");
          }

          return user;
        } catch (error: any) {
          console.error(error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {

    async session({ session }) {

      const dbUser = await db.user.findUnique({
        where: { email: session.user?.email as string }, include: {accounts: true, posts: true, sessions: true},
      });

      if (session && session.user && dbUser) {

        session.user.id = dbUser.id;
        session.user.emailVerified = dbUser.emailVerified;
        session.user.username = dbUser.username;
        session.user.hashedPassword = dbUser.id;
        session.user.image = dbUser.image;
        session.user.imageKey = dbUser.imageKey;
        session.user.posts = dbUser.posts;
        session.user.accounts = dbUser.accounts;
        session.user.createdAt = dbUser.createdAt;
        session.user.updateAt = dbUser.updateAt;
        
      }

      return session;

    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/log-in",
  },
  debug: process.env.NODE_ENV === "development",
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
