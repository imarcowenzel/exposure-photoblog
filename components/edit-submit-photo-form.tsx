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
import { editSchema } from "@/schemas";
import { PostWithPhotoAndUser } from "@/types/index";
import { useUploadThing } from "@/utils/uploadthing";
import { CloseButton } from "./close-button";

type Props = {
  user: User;
  post?: PostWithPhotoAndUser;
};

export const EditSubmitPhotoForm = ({ user, post }: Props) => {

  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  const { photoUrl, photoPreview, setPhotoPreview } = useSubmit();

  const buttonText = post ? "Edit" : "Post";

  const form = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      tags: post?.tags.join(",") || "",
    },
  });

  function onChange(value: string, field: any) {
    const tagsArray = value.split(",").map((tag) => tag.trim().toLowerCase());
    setTags([...tagsArray]);
    field.onChange({ target: { value } });
  }

  async function onSubmit() {

    if (post) {

      try {

        const url = `${process.env.NEXT_PUBLIC_URL}/api/posts/${post.id}`;
        const res = await axios.put(url, { tags });

        if (res.status === 200) {
          toast.success(res.data.message);
          window.location.href = `/post/${post.id}`;
        }

      } catch (error: any) {

        console.error(error.data);
        toast.error(error.response?.data.message || "Something went wrong!")
        
      }

    } else {

      try {

        const imgRes = await startUpload(photoUrl);

        if (imgRes && imgRes.length > 0 && user) {

          const data = {
            url: imgRes?.[0].url,
            key: imgRes?.[0].key,
            userId: user.id,
            tags: tags,
          };

          const url = `${process.env.NEXT_PUBLIC_URL}/api/posts`;

          const res = await axios.post(url, data);

          if (res.status === 201) {
            toast.success(res.data.message);
            setPhotoPreview("")
            router.replace(`/profile/${user.username}`);
          }

        }

      } catch (error: any) {

        console.log("Error", error.response.data);
        toast.error(
          error.response.data.message || "Something went wrong!",
        );

      }
    }
  }

  return (
    <>
      {post && <CloseButton />}

      <Image
        src={post?.photo?.url || photoPreview}
        alt="Photo Preview"
        priority
        width={1368}
        height={1368}
        className="max-h-dvh w-dvw md:w-auto" 
      />

      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
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
                    onChange={({ target: { value } }) => onChange(value, field)}
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
            {!form.formState.isSubmitting
              ? buttonText
              : post
                ? "Editing..."
                : "Posting..."}
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
