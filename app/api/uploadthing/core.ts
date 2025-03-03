import { createUploadthing, type FileRouter } from "uploadthing/next";

import { auth } from "@/lib/auth-options";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f(
    { image: { maxFileSize: "32MB", maxFileCount: 1 } },
    { awaitServerData: true }
  )
    .middleware(async () => {
      const session = await auth();
      if (!session) throw new Error("Unauthorized");

      return { session };
    })
    .onUploadComplete(async ({ metadata }) => {
      console.log("Upload completo!", metadata);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
