import { redirect } from "next/navigation";

import { auth } from "@/lib/auth-options";
import db from "@/lib/db";

type Props = {
  params: {
    username: string;
  };
};

const ProfilePage = async ({ params }: Props) => {
  const session = await auth();

  const userPage = await db.user.findUnique({
    where: { username: params.username },
  });

  if (!session) {
    localStorage.setItem("returnTo", window.location.pathname);
    redirect("/log-in");
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>{session.user.username}</p>
      <p>{`User page: ${userPage?.username}`}</p>
    </div>
  );
};

export default ProfilePage;
