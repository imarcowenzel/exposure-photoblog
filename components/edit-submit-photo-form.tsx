"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { DeletePhoto } from "@/app/(root)/post/[postId]/edit/components/delete-photo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSubmit } from "@/hooks/use-submit";
import { useUploadThing } from "@/utils/uploadthing";
import { PostWithPhotoAndUser } from "../types/index";
import { CloseButton } from "./close-button";

const formSchema = z.object({
  tags: z
    .string()
    .min(2, { message: "Tag must contain at least 2 characters(s)" }),
});

type Props = {
  user: User;
  post?: PostWithPhotoAndUser;
};

export const EditSubmitPhotoForm = ({ user, post }: Props) => {
  
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const { photoUrl, photoPreview, setPhotoPreview } = useSubmit();
  const { startUpload } = useUploadThing("imageUploader");

  const buttonText = post ? "Edit" : "Post"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: post?.tags.join(",") || "",
    },
  });

  async function onSubmit() {

    try {

      const imgRes = await startUpload(photoUrl);

      if (imgRes && imgRes.length > 0 && user) {
        const data = {
          url: imgRes?.[0].url,
          imageKey: imgRes?.[0].key,
          userId: user.id,
          tags: tags,
        };

        const res = await axios.post("/api/posts", data);

        if (res.status === 201) {
          toast.success("Post created!");
          router.replace(`/profile/${user.username}`);
        }

      }

    } catch (error: any) {

      console.log("Error", error);
      toast.error("Failed to submit the post! Please try again.");

    }

  }

  return (
    <>

      {post && <CloseButton />}

      <Image
        src={post?.photo?.url || photoPreview}
        alt={JSON.stringify(post?.tags) || "Photo Preview"}
        priority
        width={1368}
        height={1368}
      />

      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-y-4"
        >
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    name="tags"
                    aria-label="Tags"
                    placeholder="Add a tag (separate each tag with a comma)"
                    onChange={({ target: { value } }) => {
                      // Split the input value by commas, trim each tag, and convert to lowercase
                      const tagsArray = value
                        .split(",")
                        .map((tag) => tag.trim().toLowerCase());
                      // Update the 'tags' state with the trimmed and lowercase tags array
                      setTags([...tagsArray]);
                      field.onChange({ target: { value } });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            disabled={form.formState.isSubmitting}
            variant={"outline"}
            className="w-full"
          >
            {!form.formState.isSubmitting ? buttonText : "Loading"}
          </Button>

          {post ? (
            <DeletePhoto />
          ) : (
            <Button
              type="button"
              onClick={() => setPhotoPreview("")}
              variant={"destructive"}
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              Delete
            </Button>
          )}

        </form>
      </Form>
    </>
  );
};
