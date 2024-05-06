import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  loggedInUserIsOwner: boolean;
};

export const NoPostsYets = ({ loggedInUserIsOwner }: Props) => {
  return (
    <div className="flex items-center text-center py-24 lg:py-36 2xl:py-0 2xl:h-full">
      {loggedInUserIsOwner ? (
        <h3 className="text-lg md:text-xl lg:text-3xl">
          You haven&apos;t shared any posts yet!
          <br />
          <Link
            href={"/submit"}
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-base font-semibold text-black md:text-lg lg:text-2xl",
            )}
          >
            Let&apos;s create your debut post!
          </Link>
        </h3>
      ) : (
        <h3 className="text-lg md:text-xl lg:text-3xl">
          This user hasn&apos;t shared any posts yet.
        </h3>
      )}
    </div>
  );
};
