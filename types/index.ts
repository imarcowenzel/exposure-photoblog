import { Photo, Post, User } from "@prisma/client";

export type PostWithPhotoAndUser = Post & {
  photo: Photo;
  user: User;
};

export type UserWithPosts = User & { posts: PostWithPhotoAndUser[] };
