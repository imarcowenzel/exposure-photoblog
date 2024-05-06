import { HeartCrackIcon } from "lucide-react";

export const NoResults = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 py-14 md:py-24 lg:py-48 2xl:py-0">
      <HeartCrackIcon className="h-12 w-12 text-[#FF0000] lg:h-16 lg:w-16" />
      <h3 className="text-center text-lg md:text-xl lg:text-3xl">
        Sorry, no results were found.
      </h3>
    </div>
  );
};
