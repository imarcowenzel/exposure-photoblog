import { HeartCrackIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NoPosts = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-10 text-center">
      <HeartCrackIcon height={48} width={48} color="#FF0000" />
      <h1 className="p-5 text-3xl">Looks like there&apos;s no posts yet!</h1>
      <Link
        href="/submit"
        className={cn(
          buttonVariants({ variant: "link" }),
          "text- black p-5 text-2xl",
        )}
      >
        Be the first to post.
      </Link>
    </div>
  );
};
