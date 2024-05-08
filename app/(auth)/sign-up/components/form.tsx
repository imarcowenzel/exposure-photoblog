"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { OAuthButton } from "@/components/oauth-button";
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
import { signUpSchema } from "@/schemas";

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  
  const { isLoading, signingUp, setSigningUp, setIsLoading } = useLoading();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const router = useRouter();

  function toggleVisibility(id: string) {
    if (id === "password") {
      setIsPasswordVisible((prev) => !prev);
    } else {
      setIsConfirmPasswordVisible((prev) => !prev);
    }
  }

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpSchema) {

    setIsLoading(true);
    setSigningUp(true);

    try {

      const url = `${process.env.NEXT_PUBLIC_URL}/api/users`
      const res = await axios.post(url, data);

      if (res.status === 201) {
        const res = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (res?.ok) {
          toast.success("Account created successfully.");
          router.push("/");
        }
      }
    } catch (error: any) {
      console.error(error.response.data);
      toast.error(
        error.response.data.message || "An error occurred while creating the user.",
      );
    } finally {
      setIsLoading(false);
      setSigningUp(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <OAuthButton />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  disabled={isLoading}
                  placeholder="email@email.com"
                  aria-invalid={!!form.formState.errors.email}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="username"
                  disabled={isLoading}
                  placeholder="johndoe"
                  aria-invalid={!!form.formState.errors.username}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  disabled={isLoading}
                  placeholder="******"
                  aria-invalid={!!form.formState.errors.password}
                />
              </FormControl>
              <button
              type="button"
                onClick={() => toggleVisibility("password")}
                className="absolute right-3 top-9 z-10 cursor-pointer"
              >
                {isPasswordVisible ? (
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
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="confirmPassword"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  disabled={isLoading}
                  placeholder="******"
                  aria-invalid={!!form.formState.errors.confirmPassword}
                />
              </FormControl>
              <button
              type="button"
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
        <Button type="submit" disabled={isLoading} className="w-full">
          {signingUp ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </Form>
  );
};
