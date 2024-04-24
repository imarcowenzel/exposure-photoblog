import axios from "axios";
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

const PostPage = async ({ params }: Props) => {
  const session = await auth();
  const url = `http://localhost:3000/api/posts/${params.postId}`;
  const res = await axios.get(url);

  if (!res) return NotFound;

  const post: PostWithPhotoAndUser = res.data;

  const createdAt = new Date(post.createdAt);
  const formattedDate = formatter.format(createdAt);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-0 2xl:min-h-[calc(100dvh-470px)]">
      
      <div className="flex w-full flex-col gap-3 md:mt-8 md:gap-6 md:px-24 max-w-[1280px] ">
        {/* Post Top */}
        <div className="w-dvw md:w-auto">
          <Image
            src={post.photo?.url!} //TODO: check the undefined
            alt="Posto photo"
            width={1368}
            height={1368}
            priority
            className="w-full object-cover md:object-contain"
          />
        </div>
        {/* Post Bottom */}
        <div className="flex w-full flex-col gap-2 p-5 md:p-0 md:pb-5">
          <Link href={`/profile/${post.userId}`}>
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

          {session?.user.username === post.user?.username && (
            <div className="flex justify-end">
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
            </div>
          )}

        </div>
      </div>

    </section>
  );
};

export default PostPage;
