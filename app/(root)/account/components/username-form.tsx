"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoading } from "@/hooks/use-loading";
import { usernameSchema } from "@/schemas";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
};

export const UsernameForm = ({ user }: Props) => {

  const router = useRouter()
  const { update } = useSession();
  const { isLoading, changingUsername, setIsLoading, setChangingUsername } = useLoading();

  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { newUsername: user.username },
  });

  async function onSubmit(data: z.infer<typeof usernameSchema>) {

    setIsLoading(true);
    setChangingUsername(true);

    try {

      if (user.username === data.newUsername) {
        toast.warning("The new username is the same as the current one.");
        return;
      }

      const url = `${process.env.NEXT_PUBLIC_URL}/api/users/${user.username}`;
      const res = await axios.put(url, {
        newUsername: data.newUsername,
        user: user,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        update();
        router.refresh()
      }

    } catch (error: any) {

      console.error(error.response.data);
      toast.error(error.response.data.message || "Something went wrong.");

    } finally {
      setIsLoading(false);
      setChangingUsername(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <FormField
          name="newUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="newUsername">Username</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} id="newUsername" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {
            !changingUsername ? "Save change" : "Saving chance..."
          }
        </Button>
      </form>
    </Form>
  );
};
