"use client";

import Image from "next/image";
import Link from "next/link";

import { PostWithPhotoAndUser } from "@/types";
import { usePathname } from "next/navigation";

type Props = {
  posts: PostWithPhotoAndUser[];
};

export const PostsFeed = ({ posts }: Props) => {
  const pathname = usePathname();
  const showCaption = !pathname.includes("/profile");

  return (
    <div className="grid grid-cols-1 h-full items-center justify-center gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-20 lg:grid-cols-5">
      {posts.map((post) => (
        <figure key={post.id} className="flex flex-col gap-2">
          <Link href={`/post/${post.id}`}>
            <Image
              src={post.photo.url}
              priority
              alt={`${post.user.username}\`s post`}
              height={400}
              width={400}
            />
          </Link>

          {showCaption && (
            <figcaption className="flex items-center justify-between px-2">
              <Link
                href={`/profile/${post.user.username}`}
                className="flex items-center gap-4"
              >
                <div className="relative h-6 w-6">
                  <Image
                    src={post.user.image || "/assets/profile-picture.svg"}
                    alt="Profile picture"
                    fill
                    priority
                    sizes="100svh"
                    className="rounded-full object-cover"
                  />
                </div>

                <p className="text-xs text-secondary">{`${post.user.username}`}</p>
              </Link>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};
