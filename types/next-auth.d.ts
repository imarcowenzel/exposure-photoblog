import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: Date | null;
      username: string;
      image: string | null;
      imageKey: string | null;
      posts: any[] | null;
    } & DefaultSession["user"];
  }
}
