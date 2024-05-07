"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PostWithPhotoAndUser } from "@/types";

type Props = {
  post: PostWithPhotoAndUser;
};

export const Post = ({ post }: Props) => {
  const pathname = usePathname();
  // TODO: condition if goes to profile page
  const showCaption = !pathname.includes("/profile");

  return (

    <figure key={post.id} className="flex flex-col gap-2">

      <Link href={`/post/${post.id}`}>
        <Image
          priority
          src={post.photo.url}
          alt={`${post.user.username}\`s post`}
          height={1368}
          width={1368}
        />
      </Link>

      {showCaption && (
        <figcaption className="flex items-center justify-between px-2">
          <Link
            href={`/${post.user.username}`}
            className="flex items-center gap-4"
          >
            <p className="text-xs text-secondary">{`/ ${post.user.username}`}</p>
          </Link>
        </figcaption>
      )}
    </figure>
  );
};
