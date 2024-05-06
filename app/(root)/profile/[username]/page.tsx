import axios from "axios";
import { Metadata } from "next";

import { PostsFeed } from "@/components/posts-feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth-options";
import { cn } from "@/lib/utils";
import { UserWithPosts } from "@/types";
import { NoPostsYets } from "./components/no-posts-yet";

type MetadataProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const url = `${process.env.NEXTAUTH_URL}/api/users/${params.username}`;
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
  
  const url = `${process.env.NEXTAUTH_URL}/api/users/${params.username}`;
  const res = await axios.get(url);
  const profileUser: UserWithPosts = res.data;

  const session = await auth();
  const loggedInUserIsOwner =
    session?.user.id === profileUser.id ? true : false;

  return (
    <section
      className={cn(
        "flex w-full flex-col items-center gap-10 px-4 py-8 lg:px-0 2xl:min-h-dvh",
        profileUser.posts.length === 0 && "h-full",
      )}
    >
      <div className="flex h-full max-w-7xl flex-col items-center gap-10 md:w-[95%]">
        <div className="flex flex-col items-center gap-5">
          <Avatar>
            <AvatarImage
              src={profileUser.image! || "/assets/profile-picture.svg"}
            />
            <AvatarFallback>USER</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-medium">{profileUser.username}</h2>
        </div>

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
