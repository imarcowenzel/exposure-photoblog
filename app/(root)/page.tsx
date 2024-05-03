import axios from "axios";
import { ChevronRight } from "lucide-react";

import { PostsFeed } from "@/components/posts-feed";
import { PostWithPhotoAndUser } from "@/types";
import { NoPosts } from "./components/no-posts";

const HomePage = async () => {
  const url = `${process.env.NEXTAUTH_URL}/api/posts`;
  const res = await axios.get(url);
  const posts: PostWithPhotoAndUser[] = res.data;

  return (
    <section className="flex w-full h-full flex-col items-center gap-10 px-4 py-8 lg:px-0">
      <div className="max-w-7xl h-full md:w-[95%]">
        {posts.length !== 0 ? (
          <div className="flex flex-col gap-8 lg:gap-20">
            <div className="flex gap-2">
              <ChevronRight size={36} strokeWidth={3} />
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
