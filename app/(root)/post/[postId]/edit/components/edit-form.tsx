"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PostWithPhotoAndUser } from "@/types";
import { DeletePhoto } from "./delete-photo";

type Props = {
  user: User;
  post: PostWithPhotoAndUser;
};

const formSchema = z.object({
  tags: z.string().min(2),
});

const EditForm = ({ user, post }: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: post?.tags.join(","),
    },
  });

  if (!post) return null;

  async function onSubmit() {
    // TODO: is loading
    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/api/posts/${post.id}`;
      const res = await axios.put(url, { tags });

      if (res.status !== 200) {
        console.log(res.data);
      }

      toast.success(res.data.message);
      router.replace(`/post/${post.id}`);
    } catch (error: any) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
      toast.error(error.response.data);
    }
  }

  return (
    <section className="md:min-h-[calc(100dvh-1228px]) flex min-h-[calc(100dvh-1404px)] w-full flex-col items-center justify-center gap-y-10 py-6 lg:min-h-[calc(100dvh-358px)]">
      <div className="flex h-full w-full flex-col items-start gap-y-6 px-5 md:gap-y-12">
        <div className="flex w-full flex-col items-center gap-y-4 pt-2.5">
          <div className="flex w-full justify-center">
            <Image
              src={post.photo.url} //TODO: check null of url
              alt={JSON.stringify(post.tags)}
              width={500}
              height={500}
              priority
              className="object-cover lg:w-1/3 lg:px-0"
            />
          </div>

          {/* Post Bottom */}
          <div className="flex w-full flex-col gap-y-2 md:w-2/4 lg:w-1/3">
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
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
                <Button variant={"outline"} className="w-full">
                  Edit
                </Button>
              </form>
            </Form>
          </div>

          <DeletePhoto />
        </div>
      </div>
    </section>
  );
};

export default EditForm;
