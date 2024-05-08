import axios from "axios";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { PostWithPhotoAndUser } from "@/types";
import { NoPosts } from "./components/no-posts";
import { PostsFeed } from "@/components/feed";

export const revalidate = 0;

const HomePage = async () => {

  const url = `${process.env.NEXTAUTH_URL}/api/posts`;
  const res = await axios.get(url);
  const posts: PostWithPhotoAndUser[] = res.data;

  return (
    
    <section
      className={cn(
        "flex flex-col gap-10 px-4 py-8 md:items-center lg:min-h-dvh",
        posts.length === 0 && "h-[calc(100dvh-50px)] justify-center",
      )}
    >
      <div className="max-w-7xl lg:w-[95%]">

        {posts.length !== 0 ? (
          <div className="flex flex-col gap-8 lg:gap-20">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-9 w-9 stroke-[3]" />
              <h1 className="text-3xl font-medium uppercase md:text-4xl">
                From the community
              </h1>
            </div>
            <PostsFeed posts={posts} />
          </div>
        ) : (
          <NoPosts />
        )}
      </div>
      
    </section>
  );
};

export default HomePage;
