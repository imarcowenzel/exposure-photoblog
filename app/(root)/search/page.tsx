import axios from "axios";
import { Metadata } from "next";
import qs from "query-string";

import { PostsFeed } from "@/components/feed";
import { cn } from "@/lib/utils";
import { SearchForm } from "./components/form";
import { NoResults } from "./components/no-results";

type MetadataProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: MetadataProps): Promise<Metadata> {
  const q = searchParams.q;

  let title = "Search | EXPOSURE";

  if (q !== undefined && q !== null) {
    title = `${q} - Search | EXPOSURE`;
  }

  return {
    title: title,
  };
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  let results = null;

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_URL}/api/posts/`,
    query: {
      q: searchParams.q,
    },
  });

  if (searchParams.q) {
    const res = await axios.get(url);
    results = res.data;
  }

  return (
    <section
      className={cn(
        "flex flex-col gap-10 px-4 py-8 md:items-center lg:min-h-dvh lg:px-0",
        results &&
          results.length === 0 &&
          "h-[calc(100dvh-50px)] justify-center",
        !results && "h-[calc(100dvh-50px)] justify-between",
      )}
    >
      <div
        className={cn(
          "flex h-full max-w-7xl flex-col items-center justify-center gap-12 md:w-[95%]",
          results && results.length === 0 && "justify-between",
          !results && "justify-center",
        )}
      >
        <div className="flex w-fit flex-col">
          <SearchForm />
        </div>

        {!results ? null : results.length !== 0 ? (
          <PostsFeed posts={results} />
        ) : (
          <>
            <NoResults />
            <div />
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
