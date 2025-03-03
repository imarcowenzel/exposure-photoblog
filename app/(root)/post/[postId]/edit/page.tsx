import axios from "axios";
import { redirect } from "next/navigation";

import { EditSubmitPhotoForm } from "@/components/edit-submit-photo-form";
import { auth } from "@/lib/auth-options";
import { PostWithPhotoAndUser } from "@/types";
import NotFound from "@/app/not-found";

type Props = {
  params: { postId: string };
};

const EditPage = async ({ params }: Props) => {
  const session = await auth();
  if (!session) redirect("/log-in");

  const url = `${process.env.NEXT_PUBLIC_URL}/api/posts/${params.postId}`;
  const res = await axios.get(url);
  const post: PostWithPhotoAndUser = res.data;
  if (!post) return NotFound;

  if (session.user.id !== post.userId) redirect("/");

  return (
    <section className="relative flex w-full flex-col justify-center gap-10 px-5 py-20 md:items-center md:px-12 2xl:min-h-dvh">
      <div className="flex max-w-3xl flex-col items-center justify-center gap-6 md:w-full md:gap-12">
        <EditSubmitPhotoForm post={post} user={session.user} />
      </div>
    </section>
  );
};

export default EditPage;
