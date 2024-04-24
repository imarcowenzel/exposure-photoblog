import { redirect } from "next/navigation";

import { auth } from "@/lib/auth-options";

const AccountPage = async () => {

  const session = await auth();

  if (!session) {
    redirect("/log-in");
  }

  return (
    <div>
      <h1>Account</h1>
      <p>{session.user.username}</p>
    </div>
  );
};

export default AccountPage;
