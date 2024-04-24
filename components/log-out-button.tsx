"use client";

import { signOut, useSession } from "next-auth/react";

const LogOutButton = () => {
  return (
    <button onClick={() => signOut({ callbackUrl: "/log-in" })}>Log out</button>
  );
};

export default LogOutButton;
