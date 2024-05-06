import { HeartCrackIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NoPosts = () => {
  return (
    
    <div className="flex h-full flex-col items-center justify-center gap-5 py-14 text-center md:py-24 lg:py-48 2xl:py-0">

      <HeartCrackIcon className="h-12 w-12 text-[#FF0000] lg:h-16 lg:w-16" />

      <div className="flex flex-col">
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
          Be the first to post.
        </Link>
      </div>

    </div>
  );
};
