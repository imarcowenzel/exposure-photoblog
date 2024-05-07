import Image from "next/image";
import Link from "next/link";

import { PostWithPhotoAndUser } from "@/types";

export const OneColumnPosts = ({ posts }: { posts: PostWithPhotoAndUser[] }) => {
  return (
    <>
      {posts.map((post) => (
        <figure key={post.id} className="flex flex-col gap-2">
          <Link href={`/post/${post.id}`}>
            <Image
              src={post.photo.url}
              priority
              alt={`${post.user.username}'s post`}
              height={400}
              width={400}
            />
          </Link>
          <figcaption className="flex items-center justify-between px-2">
            <Link
              href={`/profile/${post.user.username}`}
              className="flex items-center gap-4"
            >
              <p className="text-xs text-secondary">{`/ ${post.user.username}`}</p>
            </Link>
          </figcaption>
        </figure>
      ))}
    </>
  );
};
