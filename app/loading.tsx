import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    // TODO
    <section className="flex min-h-[calc(100dvh-497px)] w-full flex-col items-center justify-center gap-y-10 py-12 md:min-h-[calc(100dvh-321px)] lg:min-h-[calc(100dvh-256.98px)] h-[600px] md:h-0">
      <div className="flex flex-col items-center justify-center gap-y-6 md:gap-y-8">
        <Loader2Icon className="h-7 w-7 md:h-8 md:w-8 animate-spin" />
      </div>
    </section>
  );
};

export default Loading;
