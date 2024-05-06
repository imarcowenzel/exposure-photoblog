import axios from "axios";
import { Metadata } from "next";
import qs from "query-string";

import { PostsFeed } from "@/components/posts-feed";
import { Separator } from "@/components/ui/separator";
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

  // TODO: search alway at lowercase
  const url = qs.stringifyUrl({
    url: `${process.env.NEXTAUTH_URL}/api/posts/`,
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
        "flex w-full flex-col items-center gap-10 px-4 py-8 lg:px-0 2xl:min-h-dvh 2xl:h-full",
        results && results.lenght === 0 && "h-full",
      )}
    >

      <div
        className={cn(
          "flex max-w-7xl flex-col items-center gap-12 md:w-[95%] 2xl:h-full ",
          !results && "h-full justify-center py-14 md:py-24 lg:py-48 2xl:py-0",
        )}
      >

        <div className="flex w-fit flex-col">
          <SearchForm />
          <Separator className="h-[2px]" />
        </div>

        {!results ? null : results.length !== 0 ? (
          <PostsFeed posts={results} />
        ) : (
          <NoResults />
        )}

      </div>
    </section>
  );
};

export default SearchPage;
