"use client";

import axios from "axios";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

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
import { useState } from "react";

type Props = {
  user: User;
};

export const DeleteImageModal = ({ user }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit() {
    setIsLoading(true);

    try {
      const data = {
        deleteImageKey: user.imageKey,
      };

      const url = `${process.env.NEXT_PUBLIC_URL}/api/users/${user.username}`;
      const res = await axios.put(url, data);

      console.log("Response", res);

      if (res.status === 200) {
        toast.success("Image deleted succesfully!");
        setOpen(false);
        router.refresh();
      }
    } catch (error: any) {
      console.log("Error", error.response);
      toast.error(
        error.response.data || "Failed to submit the post! Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          name="deletePhoto"
          variant={"link"}
          aria-label="Delete Photo"
          onClick={() => {}}
          className="whitespace-nowrap p-0 text-sm text-red-500"
        >
          Delete photo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure? This can`t be undone.</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between gap-3">
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            variant="destructive"
            className="flex-1"
          >
            {!isLoading ? "Yes" : "Deleting..."}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading} className="flex-1">
              No
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
