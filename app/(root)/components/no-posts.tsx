import Link from "next/link";

import { HeartCrack } from "@/components/heart-crack";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NoPosts = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <HeartCrack />
      <div className="flex flex-col text-center">
        <h1 className="text-lg md:text-xl lg:text-3xl">
          Looks like there&apos;s no posts!
        </h1>
        <Link
          href="/submit"
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-base font-semibold text-black md:text-lg lg:text-2xl",
          )}
        >
          Be the first to post
        </Link>
      </div>
    </div>
  );
};
