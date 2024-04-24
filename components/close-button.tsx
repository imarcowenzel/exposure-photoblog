"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const CloseButton = () => {
  const router = useRouter();

  function onClick() {
    router.back();
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close Button"
      className="absolute left-4 top-5"
    >
      <ArrowLeft />
    </button>
  );
};
