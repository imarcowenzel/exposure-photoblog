import axios from "axios";
import { SearchForm } from "./components/search-form";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {

  let results = null;

  if (searchParams.query) {

    const res = await axios.get("http://localhost:3000/api/posts", {
      data: searchParams.query,
    });

    results = res.data;

    return results
  }

  return (
    <section className="flex flex-col gap-4 w-full h-dvh justify-center items-center py-12">
      <SearchForm />
      {JSON.stringify(results)}
    </section>
  );
};

export default SearchPage;
