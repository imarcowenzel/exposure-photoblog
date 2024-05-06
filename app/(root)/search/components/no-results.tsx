import { HeartCrack } from "@/components/heart-crack";

export const NoResults = () => {
  return (
    <div className="flex flex-col items-center gap-5 py-24 md:py-36 lg:h-full lg:justify-center lg:py-0 ">
      <HeartCrack />
      <h3 className="text-center text-lg md:text-xl lg:text-3xl">
        Sorry, no results were found.
      </h3>
    </div>
  );
};
