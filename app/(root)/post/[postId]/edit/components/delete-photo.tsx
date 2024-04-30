"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

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

export const DeletePhoto = () => {

  const { postId } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  // TODO: Is Loading, melhorar a function

  async function onSubmit() {
    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/api/posts/${postId}`;
      const res = await axios.delete(url);
      if (res.status === 200) {
        toast.success(res.data.message);
        router.push(`/profile/${session?.user.username}`)
      }
    } catch (error: any) {
      console.log("Error:", error);
      toast.error(error.response.data);
    }
  }

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            aria-label="Delete Post Button"
            variant={"destructive"}
            className="w-full"
          >
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex gap-8">
            <DialogTitle>Are you sure? This can`t be undone.</DialogTitle>
            <DialogDescription className="flex items-center justify-between gap-x-3">
              <Button
                onClick={onSubmit}
                variant={"destructive"}
                className="flex-1"
              >
                Yes
              </Button>
              {/* //TODO: Is Loading */}
              <DialogClose asChild>
                <Button variant={"outline"} className="flex-1">
                  No
                </Button>
              </DialogClose>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
