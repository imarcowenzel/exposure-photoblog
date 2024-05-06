import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    // TODO
    <section className="flex w-full flex-col justify-center gap-10 min-h-dvh md:min-h-min md:py-52 lg:min-h-dvh lg:py-0">
    <div className="flex flex-col items-center justify-center gap-y-6 md:gap-y-8">
      <Loader2Icon className="h-10 w-10 md:h-16 md:w-16 animate-spin" />
    </div>
  </section>
  );
};

export default Loading;
