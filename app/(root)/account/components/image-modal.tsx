"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useUploadThing } from "@/utils/uploadthing";

type Props = {
  user: User;
  photoUrl: File[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  photoPreview: string;
};

export const ChangeImageModal = ({
  user,
  photoUrl,
  open,
  setOpen,
  photoPreview,
}: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  async function onSubmit() {

    setIsLoading(true);

    try {
      const imgRes = await startUpload(photoUrl);

      if (imgRes && imgRes.length > 0 && user) {

        const data = {
          newImageUrl: imgRes?.[0].url,
          newImageKey: imgRes?.[0].key,
        };
        const url = `${process.env.NEXT_PUBLIC_URL}/api/users/${user.username}`;
        const res = await axios.put(url, data);

        if (res.status === 200) {
          toast.success(res.data.message);
          setOpen(false);
          router.refresh();
        }

      }

    } catch (error: any) {

      console.log("Error", error.response);
      toast.error(
        error.response.data.message || "Failed to submit the post! Please try again.",
      );

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {!isLoading ? (
          <div className="flex h-52 max-h-52 flex-col items-center justify-between gap-6">
            <Avatar>
              <AvatarImage src={photoPreview} />
            </Avatar>
            <div className="flex w-full justify-between gap-5">
              <Button
                onClick={onSubmit}
                disabled={isLoading}
                variant="outline"
                className="flex-1"
              >
                Confirm
              </Button>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  disabled={isLoading}
                  className="flex-1"
                >
                  Delete
                </Button>
              </DialogClose>
            </div>
          </div>
        ) : (
          <div className="flex h-52 max-h-52 flex-col  items-center justify-center gap-3">
            <Loader2Icon className="h-7 w-7 animate-spin md:h-8 md:w-8" />
            <h2>Saving change...</h2>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
