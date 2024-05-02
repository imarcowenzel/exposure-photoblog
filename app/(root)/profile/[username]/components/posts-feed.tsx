import Image from "next/image";
import Link from "next/link";

import { PostWithPhotoAndUser } from "@/types";

type Props = {
  posts: PostWithPhotoAndUser[];
};

export const PostsFeed = ({ posts }: Props) => {
  return (
    <>
      <h2 className="bg-primary px-4 py-1 text-primary">Gallery</h2>
      <div className="grid w-fit h-full grid-cols-1 items-center justify-center gap-6 md:grid-cols-4 md:gap-8 2xl:grid-cols-5">
        {posts.map((post) => (
          <figure key={post.id} className="flex flex-col gap-y-2">
            <Link href={`/post/${post.id}`}>
              <Image
                src={post.photo?.url}
                alt={`${post.user.username}\`s post`}
                priority
                height={400}
                width={400}
              />
            </Link>
          </figure>
        ))}
      </div>
    </>
  );
};
