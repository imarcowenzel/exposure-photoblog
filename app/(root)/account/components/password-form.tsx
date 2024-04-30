"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoading } from "@/hooks/use-loading";
import { passwordSchema } from "@/schemas";

type Props = {
  user: User;
};

export const PasswordForm = ({ user }: Props) => {

  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const { isLoading, changingPassword, setIsLoading, setChangingPassword } =
    useLoading();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function toggleVisibility(id: string) {
    if (id === "newPassword") {
      setIsNewPasswordVisible((prev) => !prev);
    } else {
      setIsConfirmPasswordVisible((prev) => !prev);
    }
  }

  async function onSubmit(data: z.infer<typeof passwordSchema>) {
    setIsLoading(true);
    setChangingPassword(true);
    try {
      const passwordData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        user: user,
      };
      const url = `${process.env.NEXT_PUBLIC_URL}/api/users/${user.username}`;
      const res = await axios.put(url, passwordData);
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.data.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
      setChangingPassword(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <FormField
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="currentPassword">Current password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  type="password"
                  id="currentPassword"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="newPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="newPassword">New password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  type={isNewPasswordVisible ? "text" : "password"}
                  id="newPassword"
                />
              </FormControl>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => toggleVisibility("newPassword")}
                className="absolute right-3 top-9 z-10 cursor-pointer"
              >
                {isNewPasswordVisible ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                />
              </FormControl>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => toggleVisibility("confirmPassword")}
                className="absolute right-3 top-9 z-10 cursor-pointer"
              >
                {isConfirmPasswordVisible ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {!changingPassword ? "Save change" : "Saving change..."}
        </Button>
      </form>
    </Form>
  );
};
