"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  const router = useRouter();

  return (
    <section className="flex w-full h-dvh flex-col justify-center gap-10 px-4 py-24 md:px-36 lg:min-h-dvh">

      <div className="flex h-full flex-col items-center justify-center gap-4">

        <h1 className="text-5xl lg:text-6xl font-semibold">404 Error</h1>
        <h1 className="text-base font-medium md:text-lg lg:text-2xl">
          Sorry, page not found!
        </h1>
        <Button onClick={() => router.push("/")} variant={"outline"}>
          Back to home
        </Button>

      </div>

    </section>
  );
};

export default NotFound;
