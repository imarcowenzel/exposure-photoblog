import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  loggedInUserIsOwner: boolean;
};

export const NoPostsYets = ({ loggedInUserIsOwner }: Props) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {loggedInUserIsOwner ? (
        <h3 className="text-center xl:text-xl">
          You haven&apos;t shared any posts yet!
          <br />
          <Link
            href={"/submit"}
            className={cn(buttonVariants({ variant: "link" }), "text-black")}
          >
            Let&apos;s create your debut post!
          </Link>
        </h3>
      ) : (
        <h3 className="text-center xl:text-xl">
          This user hasn&apos;t shared any posts yet.
        </h3>
      )}
    </div>
  );
};
