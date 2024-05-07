"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon } from "lucide-react";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSubmit } from "@/hooks/use-submit";

const schema = z.object({
  photo: z.string().url(),
});

export const SelectPhotoForm = () => {
  const { photoPreview, setPhotoUrl, setPhotoPreview } = useSubmit();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { photo: "" },
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
    }
  }

  if (!photoPreview) {
    return (
      <Form {...form}>
        <form className="flex h-2/3 w-full justify-center lg:w-2/3">
          <FormField
            name="photo"
            render={({ field }) => (
              <Label className="submit-label">
                <CameraIcon size={50} />
                <h3 className="whitespace-nowrap text-base font-semibold md:text-lg lg:text-2xl">
                  Select a photo
                </h3>
                <Input
                  {...field}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  aria-label="Select a photo"
                  className="hidden"
                  onChange={(e) => onChange(e)}
                />
              </Label>
            )}
          />
        </form>
      </Form>
    );
  }
};
