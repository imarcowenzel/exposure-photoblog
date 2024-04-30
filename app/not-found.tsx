"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  
  const router = useRouter();

  return (
    <section className="flex w-full flex-col gap-10 px-5 py-16 md:px-16 2xl:h-[calc(100dvh-470px)] 2xl:px-24">
      <div className="flex flex-col items-center h-full justify-center gap-4">
        <h1 className="text-4xl font-semibold">404 Error</h1>
        <h1 className="text-lg font-medium">Sorry, page not found</h1>
        <Button
          onClick={() => router.push("/")}
          variant={"outline"}
        >
          Back to home.
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
