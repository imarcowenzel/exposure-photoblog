"use client";

import { useRouter } from "next/navigation";
import { FaRegFaceSadTear } from "react-icons/fa6";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const router = useRouter();

  return (
    <section className="flex min-h-[calc(100dvh-497px)] w-full flex-col items-center justify-center gap-y-10 py-12 md:min-h-[calc(100dvh-321px)] lg:min-h-[calc(100dvh-256.98px)] h-[768px] md:h-0">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <FaRegFaceSadTear className="text-4xl" />
        <h1 className="text-2xl font-bold">Page not found!</h1>
        <p
          onClick={() => router.back()}
          className={cn("cursor-pointer")}
        >
          Go back.
        </p>
      </div>
    </section>
  );
};

export default NotFound;
