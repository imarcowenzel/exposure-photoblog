"use client";

import { useEffect } from "react";

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
    <section className="flex w-full flex-col gap-10 px-5 py-16 md:px-16 2xl:h-[calc(100dvh-470px)] 2xl:px-24">
      <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-semibold">500 Error</h1>
        <h1 className="text-lg font-medium">Something went wrong!</h1>
      </div>
    </section>
  );
};

export default Error;
