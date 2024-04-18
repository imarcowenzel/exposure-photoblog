import { redirect } from "next/navigation";

import { auth } from "@/lib/auth-options";
import db from "@/lib/db";

type Props = {
  params: {
    username: string;
  };
};

const AccountPage = async ({ params }: Props) => {
  const session = await auth();

  const userPage = await db.user.findUnique({
    where: { username: params.username },
  });

  if (!session) {
    redirect("/log-in");
  }

  return (
    <div>
      <h1>Account</h1>
      <p>{session.user.username}</p>
      <p>{`User page: ${userPage?.username}`}</p>
    </div>
  );
};

export default AccountPage;
