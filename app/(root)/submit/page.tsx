"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { EditSubmitPhotoForm } from "@/components/edit-submit-photo-form";
import { useSubmit } from "@/hooks/use-submit";
import { SelectPhotoForm } from "./components/select-photo-form";

const SubmitPage = () => {

  const { photoPreview } = useSubmit();
  const { data: session } = useSession();
  if (!session) redirect("/log-in");

  return (
    <section className="flex w-full flex-col gap-10 px-5 py-16 items-center md:justify-center md:px-12 2xl:min-h-dvh 2xl:px-24">
      <div className="flex max-w-3xl flex-col items-center justify-center gap-6 md:w-full md:gap-12">
        <SelectPhotoForm />
        {photoPreview && <EditSubmitPhotoForm user={session.user} />}
      </div>
    </section>
  );
};

export default SubmitPage;
