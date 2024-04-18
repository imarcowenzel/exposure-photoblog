import { auth } from "@/lib/auth-options";

const SearchPage = async () => {
  const session = await auth();
  console.log(session);
  return <div>SearchPage</div>;
};

export default SearchPage;
