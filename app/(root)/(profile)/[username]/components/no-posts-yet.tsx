import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  loggedInUserIsOwner: boolean;
};

export const NoPostsYets = ({ loggedInUserIsOwner }: Props) => {
  return (
    <div className="flex h-full items-center justify-center text-center">
      {loggedInUserIsOwner ? (
        <h1 className="text-lg md:text-xl lg:text-3xl">
          You haven&apos;t shared any posts yet!
          <br />
          <Link
            href={"/submit"}
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-base font-semibold text-black md:text-lg lg:text-2xl",
            )}
          >
            Let&apos;s create your debut post
          </Link>
        </h1>
      ) : (
        <h1 className="text-lg md:text-xl lg:text-3xl">
          This user hasn&apos;t shared any posts yet!
        </h1>
      )}
    </div>
  );
};
