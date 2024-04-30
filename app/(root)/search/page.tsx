import axios from "axios";
import { Metadata } from "next";
import qs from "query-string";

import { Separator } from "@/components/ui/separator";
import { PostsFeed } from "../profile/[username]/components/posts-feed";
import { SearchForm } from "./components/form";

export const metadata: Metadata = {
  title: "EXPOSURE | Search",
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {

  let results = null;

  const url = qs.stringifyUrl({
    url: `${process.env.NEXTAUTH_URL}/api/posts/`,
    query: {
      query: searchParams.query,
    },
  });

  if (searchParams.query) {
    const res = await axios.get(url);

    results = res.data;
  }

  return (
    <section className="flex w-full flex-col items-center gap-10 px-5 py-16 md:px-16 2xl:h-[calc(100dvh-470px)] 2xl:px-24">
      <div className="flex flex-col">
        <SearchForm />
        <Separator className="h-[2px]" />
      </div>

      {!results ? null : !!results.length ? (
        // TODO: put the profile user at the base of the post
        <PostsFeed posts={results} />
      ) : (
        <p>No results found!</p>
      )}
    </section>
  );
};

export default SearchPage;
