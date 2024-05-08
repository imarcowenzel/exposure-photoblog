"use client";

import { signIn } from "next-auth/react";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useLoading } from "@/hooks/use-loading";
import { cn } from "@/lib/utils";
 
export const OAuthButton = () => {

  const { isLoading, setIsLoading } = useLoading();

  async function authenticationWithGoogle() {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
      toast.success("Successfully authenticate with Google!");
    } catch (error: any) {
      toast.error("An error ocurred when trying to authenticate!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        disabled={isLoading}
        onClick={authenticationWithGoogle}
        className={cn(
          `flex w-full items-center justify-between`,
          isLoading && "cursor-not-allowed",
        )}
      >
        <GoogleIcon size={20} />
        Google
        <div />
      </Button>
    </div>
  );
};
