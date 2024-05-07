"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="h-dvh">
      <div className="flex h-full flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-semibold lg:text-6xl">500 Error</h1>
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-base md:text-lg lg:text-2xl">
            Something went wrong!
          </h2>
          <Button onClick={() => reset()} variant={"outline"} className="w-fit">
            Try again
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Error;
