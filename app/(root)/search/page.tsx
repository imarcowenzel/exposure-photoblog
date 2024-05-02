import axios from "axios";
import { Metadata } from "next";
import qs from "query-string";

import { Separator } from "@/components/ui/separator";
import { SearchForm } from "./components/form";
import { PostsFeed } from "@/components/posts-feed";
import { NoResults } from "./components/no-results";
import { cn } from "@/lib/utils";

type MetadataProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: MetadataProps): Promise<Metadata> {
  const query = searchParams.query;

  let title = "Search | EXPOSURE";

  if (query !== undefined && query !== null) {
    title = `${query} - Search | EXPOSURE`;
  }

  return {
    title: title,
  };
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  let results = null;

  // TODO: search alway at lowercase
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
    <section
      className={cn(
        "flex w-full flex-col items-center gap-10 px-5 py-16 md:px-16 2xl:h-dvh 2xl:px-24",
        results && results.lenght === 0 && "h-full",
      )}
    >
      <div className="flex flex-col">
        <SearchForm />
        <Separator className="h-[2px]" />
      </div>

      {!results ? null : results.length !== 0 ? (
        <PostsFeed posts={results} />
      ) : (
        <NoResults />
      )}
    </section>
  );
};

export default SearchPage;
