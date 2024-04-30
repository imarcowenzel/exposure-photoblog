import axios from "axios";
import { ChevronRight } from "lucide-react";

import Error from "@/app/error";
import { PostWithPhotoAndUser } from "@/types";
import { Posts } from "./components/posts";
import { NoPosts } from "./components/no-posts";

const HomePage = async () => {
  
  const url = `${process.env.NEXTAUTH_URL}/api/posts`;
  const res = await axios.get(url);
  if (res.status !== 200) return Error;
  const posts: PostWithPhotoAndUser[] = res.data;

  return (
    <section className="flex w-full flex-col gap-10 px-5 py-16 md:px-16 lg:h-dvh 2xl:px-24">
      {posts.length !== 0 ? (
        <>
          {" "}
          <div className="flex gap-2">
            <ChevronRight size={36} strokeWidth={3} />
            <h1 className="text-3xl font-medium uppercase md:text-4xl">
              From the community
            </h1>
          </div>{" "}
          <Posts posts={posts} />
        </>
      ) : (
        <NoPosts />
      )}
    </section>
  );
};

export default HomePage;
