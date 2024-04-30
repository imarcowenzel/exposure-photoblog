import { Account, Post, Session } from "@prisma/client";
import { DefaultSession } from "next-auth";

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
      posts: Post[];
      accounts: Account[];
      sessions: Session[];
      createdAt: Date;
      updateAt: Date;
    } & DefaultSession["user"];
  }
}
