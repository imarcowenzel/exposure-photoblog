"use client";

import { User } from "@prisma/client";

import { EditSubmitPhotoForm } from "@/components/edit-submit-photo-form";
import { useSubmit } from "@/hooks/use-submit";
import { SelectPhotoForm } from "./components/select-photo-form";

type Props = {
  user: User;
};

export const Submit = ({ user }: Props) => {
  
  const { photoPreview } = useSubmit();

  return (

    <section className="flex w-full flex-col items-center gap-10 px-4 py-8 md:justify-center lg:px-0 2xl:min-h-dvh 2xl:px-24">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-6 md:w-[95%] md:gap-12">
        <SelectPhotoForm />
        {photoPreview && <EditSubmitPhotoForm user={user} />}
      </div>
    </section>

  );
};
