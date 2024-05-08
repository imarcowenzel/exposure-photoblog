"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Separator } from "@/components/ui/separator";
import { useLoading } from "@/hooks/use-loading";
import { logInSchema } from "@/schemas";

export const LogInForm = () => {
  
  const { isLoading, loggingIn, setLoggingIn, setIsLoading } = useLoading();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function toggleVisibility() {
    setIsPasswordVisible((prev) => !prev);
  }

  async function onSubmit(data: z.infer<typeof logInSchema>) {
    const { email, password } = data;
    setIsLoading(true);
    setLoggingIn(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        throw res?.error;
      }

      toast.success("Log in successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error || "Something went wrong!");
    } finally {
      setIsLoading(false);
      setLoggingIn(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6"
      >
        <OAuthButton />

        <Separator />

        <div className="flex flex-col gap-4">
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
                    placeholder="email@email.com"
                    disabled={isLoading}
                    aria-invalid={!!form.formState.errors.email}
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
                    placeholder="******"
                    disabled={isLoading}
                    aria-invalid={!!form.formState.errors.password}
                  />
                </FormControl>
                <span
                  onClick={toggleVisibility}
                  className="absolute right-3 top-9 z-10 cursor-pointer"
                >
                  {isPasswordVisible ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </span>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={isLoading}>
            {loggingIn ? "Loggin in..." : "Log in"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
