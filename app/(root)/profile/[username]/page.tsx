import axios from "axios";
import { Metadata } from "next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth-options";
import { UserWithPosts } from "@/types";
import { NoPostsYets } from "./components/no-posts-yet";
import { PostsFeed } from "./components/posts-feed";
import NotFound from "@/app/not-found";

type Props = {
  params: {
    username: string;
  };
};

export const metadata: Metadata = {
  title: "EXPOSURE | Profile",
};

const ProfilePage = async ({ params }: Props) => {
  
  const url = `${process.env.NEXTAUTH_URL}/api/users/${params.username}`
  const res = await axios.get(url);
  const profileOwner: UserWithPosts = res.data;

  const session = await auth();
  const isOwner = session?.user.id === profileOwner.id ? true : false;

  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 py-16 md:px-6 lg:h-dvh">

      <div className="flex flex-col items-center gap-5">
        <Avatar>
          <AvatarImage src={profileOwner.image! || "/assets/profile-picture.svg"} />
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-medium">{profileOwner.username}</h2>
      </div>

      <div className="flex gap-4">
        <h2 className="bg-primary px-4 py-1 text-primary">Gallery</h2>
      </div>

      {!!profileOwner.posts.length ? (
        <PostsFeed posts={profileOwner.posts} />
      ) : (
        <NoPostsYets isOwner={isOwner} />
      )}
    </div>
  );
};

export default ProfilePage;
