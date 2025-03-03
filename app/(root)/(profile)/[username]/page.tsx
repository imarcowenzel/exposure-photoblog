import axios from "axios";
import { Metadata } from "next";

import { PostsFeed } from "@/components/feed";
import { auth } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import { UserWithPosts } from "@/types";
import { Header } from "./components/header";
import { NoPostsYets } from "./components/no-posts-yet";

type MetadataProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/users/${params.username}`;
  const res = await axios.get(url);
  const profileUser: UserWithPosts = res.data;
  return {
    title: `${profileUser.username} | EXPOSURE`,
  };
}

type Props = {
  params: {
    username: string;
  };
};

const ProfilePage = async ({ params }: Props) => {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/users/${params.username}`;
  const res = await axios.get(url);
  const profileUser: UserWithPosts = res.data;

  const session = await auth();
  const loggedInUserIsOwner =
    session?.user.id === profileUser?.id ? true : false;

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-10 px-4 py-8 lg:min-h-dvh",
        profileUser.posts.length === 0 &&
          "h-[calc(100dvh-50px)] justify-center",
      )}
    >
      <div className="flex h-full max-w-7xl flex-col items-center gap-10 md:w-[95%]">
        <Header user={profileUser} />

        {profileUser.posts.length !== 0 ? (
          <>
            <h3 className="w-fit bg-black px-3 py-2 font-medium text-white">
              Gallery
            </h3>
            <PostsFeed posts={profileUser.posts} />
          </>
        ) : (
          <NoPostsYets loggedInUserIsOwner={loggedInUserIsOwner} />
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
