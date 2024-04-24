import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: Date | null;
      username: string;
      hashedPassword: string;
      image: string | null;
      imageKey: string | null;
      posts: any[] | null;
      accounts: any[] | null;
      sessions: any[] | null;
      createdAt: Date;
      updateAt: Date;
    } & DefaultSession["user"];
  }
}
