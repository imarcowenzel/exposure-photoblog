"use client";

import { User } from "@prisma/client";

import { EditSubmitPhotoForm } from "@/components/edit-submit-photo-form";
import { useSubmit } from "@/hooks/use-submit";
import { SelectPhotoForm } from "./components/select-photo-form";
import { cn } from "@/lib/utils";

type Props = {
  user: User;
};

export const Submit = ({ user }: Props) => {
  const { photoPreview } = useSubmit();

  return (
    <section
      className={cn(
        "flex h-[calc(100dvh-50px)] w-full flex-col items-center justify-center gap-10 px-4 py-8 lg:min-h-dvh",
        photoPreview && "h-auto",
      )}
    >
      <div className="flex h-full w-full max-w-7xl flex-col items-center justify-center gap-6 md:w-[95%]">
        <SelectPhotoForm />
        {photoPreview && <EditSubmitPhotoForm user={user} />}
      </div>
    </section>
  );
};
