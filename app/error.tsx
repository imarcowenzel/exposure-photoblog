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
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[calc(100dvh-497px)] w-full flex-col items-center justify-center gap-y-10 py-12 md:min-h-[calc(100dvh-321px)] lg:min-h-[calc(100dvh-256.98px)] h-[600px] md:h-0">
      <h1 className="text-2xl font-semibold">Something went wrong!</h1>
    </section>
  );
};

export default Error;
