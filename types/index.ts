import { Photo, Post, User } from "@prisma/client";

export type PostWithPhotoAndUser = Post & {photo: Photo | null, user: User | null}