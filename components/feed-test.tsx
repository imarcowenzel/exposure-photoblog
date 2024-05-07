"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PostWithPhotoAndUser } from "@/types";

export const FeedTest = ({ posts }: { posts: PostWithPhotoAndUser[] }) => {

  const pathname = usePathname();
  const showCaption = !pathname.includes("/profile");

  const groupPostsByColumn = () => {
    const columns: Array<PostWithPhotoAndUser[]> = [[], [], [], [], []];
    // Iterate through posts and distribute them into columns
    posts.forEach((post, index) => {
      // Calculate the index of the column for the current post
      const columnIndex = index % 5;
      // Push the post into the corresponding column
      columns[columnIndex].push(post);
    });
    return columns;
  };

  const columns = groupPostsByColumn();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`flex flex-col col-start-${columnIndex + 1} gap-5`}
        >
          {column.map((post) => (
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
                    <p className="text-xs text-secondary">{`/ ${post.user.username}`}</p>
                  </Link>
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
};
