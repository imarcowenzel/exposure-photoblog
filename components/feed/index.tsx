"use client";

import { useEffect, useState } from "react";

import { PostWithPhotoAndUser } from "@/types";
import { OneColumnPosts } from "./one-column-posts";
import { Posts } from "./posts";

type Props = {
  posts: PostWithPhotoAndUser[];
};

export const PostsFeed = ({ posts }: Props) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ${screenWidth >= 430 && screenWidth < 767 && "grid-cols-2"}`}
    >
      {screenWidth < 429 && <OneColumnPosts posts={posts} />}
      {screenWidth > 430 && <Posts posts={posts} screenWidth={screenWidth} />}
    </div>
  );
};
