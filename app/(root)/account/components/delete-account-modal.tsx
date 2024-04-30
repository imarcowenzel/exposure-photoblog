"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  user: User;
};

export const DeleteAccountModal = ({ user }: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit() {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/api/users/${user.username}`;
      const res = await axios.delete(url);

      if (res.status === 200) {
        toast.success(res.data.message);
        signOut({ callbackUrl: "/" });
      }
    } catch (error: any) {
      console.error(error.response);
      toast.error(error.response.data.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          name="deletePhoto"
          variant={"destructive"}
          aria-label="Delete Photo"
          onClick={() => {}}
          className="w-full whitespace-nowrap p-0 text-sm"
        >
          Delete account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex gap-8">
          <DialogTitle>Are you sure? This can`t be undone.</DialogTitle>
          <DialogDescription className="flex items-center justify-between gap-x-3">
            <Button
              onClick={onSubmit}
              variant={"destructive"}
              disabled={isLoading}
              className="flex-1"
            >
              {
                !isLoading ? "Yes" : "Deleting..."
              }
            </Button>
            <DialogClose asChild>
              <Button variant="outline" disabled={isLoading} className="flex-1">
                No
              </Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
