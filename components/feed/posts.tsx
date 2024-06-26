"use client";

import { useEffect, useState } from "react";

import { PostWithPhotoAndUser } from "@/types";
import { Post } from "./post";

interface Props {
  posts: PostWithPhotoAndUser[];
  screenWidth: number;
}

export const Posts = ({ posts, screenWidth }: Props) => {

  const determineColumnsCount = (width: number): number => {
    if (width >= 430 && width < 768) {
      return 2;
    } else if (width >= 768 && width < 1024) {
      return 3;
    } else {
      return 5;
    }
  };

  const [columnsCount, setColumnsCount] = useState(
    determineColumnsCount(screenWidth),
  );

  useEffect(() => {
    const resizeListener = () => {
      setColumnsCount(determineColumnsCount(window.innerWidth));
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const groupPostsByColumn = () => {
    const columns: PostWithPhotoAndUser[][] = Array.from(
      { length: columnsCount },
      () => [],
    );
    // Iterate through posts and distribute them into columns
    posts.forEach((post, index) => {
      // Calculate the index of the column for the current post
      const columnIndex = index % columnsCount;
      // Push the post into the corresponding column
      columns[columnIndex].push(post);
    });
    return columns;
  };

  const columns = groupPostsByColumn();

  return (
    <>
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`flex flex-col col-start-${columnIndex + 1} gap-5`}
        >
          {column.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      ))}
    </>
  );
};
