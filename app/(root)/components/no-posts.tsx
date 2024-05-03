import { HeartCrackIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NoPosts = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 py-10 text-center">
      <HeartCrackIcon className="h-12 w-12 text-red-600 lg:h-16 lg:w-16" />

      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl lg:text-3xl">
          Looks like there&apos;s no posts!
        </h1>
        <Link
          href="/submit"
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-black text-base md:text-lg lg:text-2xl font-semibold",
          )}
        >
          Be the first to post.
        </Link>
      </div>
    </div>
  );
};
