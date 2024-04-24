import axios from "axios";
import { ChevronRight } from "lucide-react";

import Error from "@/app/error";
import { PostWithPhotoAndUser } from "@/types";
import { Posts } from "./components/post";

const HomePage = async () => {
  const res = await axios.get("http://localhost:3000/api/posts");
  if (res.status !== 200) return Error;
  const posts: PostWithPhotoAndUser[] = res.data;

  return (
    <section className="flex w-full flex-col gap-10 px-5 py-16 md:px-16 2xl:h-[calc(100dvh-470px)] 2xl:px-24">

      <div className="flex items-start gap-2">
        <ChevronRight size={36} strokeWidth={3} />
        <h1 className="text-3xl font-medium uppercase md:text-4xl">
          From the community
        </h1>
      </div>

      {/* TODO: get No posts a better style */}
      {posts.length !== 0 ? (
        <Posts posts={posts} />
      ) : (
        <h1 className="p-5 text-3xl">No posts yet!</h1>
      )}

    </section>
  );
};

export default HomePage;
