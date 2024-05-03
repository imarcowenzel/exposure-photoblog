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
        "flex w-full flex-col items-center gap-10 px-5 py-16 md:px-6 2xl:min-h-dvh",
        profileUser.posts.length === 0 && "h-full",
      )}
    >

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
        <h3 className="bg-black text-white py-2 px-3 font-medium">Gallery</h3>
        <PostsFeed posts={profileUser.posts} />
        </>
      ) : (
        <NoPostsYets loggedInUserIsOwner={loggedInUserIsOwner} />
      )}
      
    </section>
  );
};

export default ProfilePage;
