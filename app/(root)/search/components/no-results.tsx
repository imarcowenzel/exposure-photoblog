import { HeartCrackIcon } from "lucide-react";

export const NoResults = () => {
  return (
    <div className="flex h-full flex-col gap-5 w-full items-center justify-center py-10 2xl:py-0">
      <HeartCrackIcon height={48} width={48} color="#FF0000" />
      <h3 className="text-center xl:text-xl">Sorry, no results were found.</h3>
    </div>
  );
};
