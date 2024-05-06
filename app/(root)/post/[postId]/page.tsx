import axios from "axios";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import NotFound from "@/app/not-found";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth-options";
import { cn, formatter } from "@/lib/utils";
import { PostWithPhotoAndUser } from "@/types";

type Props = {
  params: {
    postId: string;
  };
};

type MetadataProps = {
  params: { postId: string };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {

  const url = `${process.env.NEXTAUTH_URL}/api/posts/${params.postId}`;
  const res = await axios.get(url);
  const post: PostWithPhotoAndUser = res.data;
  const tags = post.tags.map((tag) => `#${tag}`).join(" ")

  const title = post.tags.length > 0 ? `${tags} | ${post.user.username} | EXPOSURE` : `${post.user.username} | EXPOSURE`

  return {
    title: title,
  };

}

const PostPage = async ({ params }: Props) => {
  
  const session = await auth();
  const url = `${process.env.NEXTAUTH_URL}/api/posts/${params.postId}`;
  const res = await axios.get(url);
  const post: PostWithPhotoAndUser = res.data;

  const createdAt = new Date(post.createdAt);
  const formattedDate = formatter.format(createdAt);

  return (
    <section className="flex w-full flex-col items-center justify-center 2xl:min-h-dvh">

      <div className="flex w-full max-w-7xl flex-col gap-3 md:mt-8 md:gap-6 md:px-24 ">

        {/* Post Top */}
        <div className="w-dvw md:w-full">
          <Image
            src={post.photo?.url}
            alt="Posto photo"
            width={1368}
            height={1368}
            priority
            className="w-full object-cover md:object-contain max-h-dvh"
          />
        </div>
        {/* Post Bottom */}
        <div className="flex w-full items-end justify-between gap-2 p-5 md:p-0 md:pb-5">

          <div className="flex w-full flex-col gap-2">

            <Link href={`/profile/${post.user.username}`}>
              <p className="text-sm font-semibold">{post.user?.username}</p>
            </Link>

            <div className="flex gap-x-2 text-[#888888]">
              {post.tags.map((tag, i) => (
                <p className="text-sm" key={i}>
                  #{tag}
                </p>
              ))}
            </div>
            <p className="text-xs text-[#888888]">{formattedDate}</p>

          </div>

          {session?.user.username === post.user?.username && (
              <Link
                href={`/post/${post.id}/edit`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-fit text-black",
                )}
                aria-label="Delete Post Button"
              >
                Edit post
              </Link>
          )}
        </div>
      </div>

    </section>
  );
};

export default PostPage;
