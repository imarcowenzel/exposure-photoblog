import Image from "next/image";
import Link from "next/link";

import { PostWithPhotoAndUser } from "@/types";

type Props = {
  posts: PostWithPhotoAndUser[];
};

export const PostsFeed = ({ posts }: Props) => {

  return (

    <div className="grid grid-cols-1 items-end justify-center gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-20 lg:grid-cols-5">

      {posts.map((post) => (

        <figure key={post.id} className="flex flex-col gap-y-2">

          <Link href={`/post/${post.id}`}>
            <Image
              src={post.photo.url}
              priority
              alt={`${post.user.username}\`s post`}
              height={400}
              width={400}
            />
          </Link>

          <figcaption className="flex items-center justify-between px-2">

            <Link
              href={`/profile/${post.userId}`}
              className="flex items-center gap-x-4"
            >
              <div className="relative h-6 w-6">
                <Image
                  src={post.user.image || "/assets/profile-picture.svg"}
                  alt={`${post.user.username}\`s profile picture`}
                  fill
                  priority
                  sizes="100svh"
                  className="rounded-full object-cover"
                />
              </div>

              <p className="text-xs text-secondary">{`${post.user.username}`}</p>
            </Link>
            
          </figcaption>

        </figure>
        
      ))}

    </div>
    
  );
};
