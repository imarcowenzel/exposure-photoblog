"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DeleteImageModal } from "./delete-image-modal";
import { ChangeImageModal } from "./image-modal";

type Props = {
  user: User;
};

const imageSchema = z.object({
  image: z.string().url(),
});

export const ImageForm = ({ user }: Props) => {

  const [photoUrl, setPhotoUrl] = useState<File[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
    defaultValues: { image: "" },
  });

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const fileReader = new FileReader();
    // Check if any files were selected
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhotoUrl(Array.from(e.target.files));
      // When the FileReader finishes loading the file
      fileReader.onload = () => {
        // Set the image preview with the result as a data URL
        setPhotoPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
      setOpen(true);
    }
  }

  return (
    <div className="flex  items-center justify-center gap-6">
      <Avatar>
        <AvatarImage src={user.image || "/assets/profile-picture.svg"} />
        <AvatarFallback>USER</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-start gap-y-1">
        <Form {...form}>
          <form className="flex w-full flex-col gap-1">
            <FormField
              name="photo"
              render={({ field }) => (
                <Label className="cursor-pointer">
                  <p className="whitespace-nowrap text-sm font-semibold">
                    Choose an image
                  </p>
                  <Input
                    {...field}
                    type="file"
                    accept="image/*"
                    multiple={false}
                    aria-label="Change photo"
                    className="hidden"
                    onChange={(e) => onChange(e)}
                  />
                </Label>
              )}
            />
          </form>
        </Form>

        {photoPreview && (
          <ChangeImageModal
            user={user}
            photoUrl={photoUrl}
            photoPreview={photoPreview}
            open={open}
            setOpen={setOpen}
          />
        )}

        {user.image && <DeleteImageModal user={user} />}
      </div>
    </div>
  );
};
