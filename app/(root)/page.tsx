"use client";

import { signOut, useSession } from "next-auth/react";

const HomePage = () => {
  const {data: session} = useSession()
  return (
    <div className="h-full">
      <h1>Home</h1>
      <p>{session?.user.username}</p>
      <button onClick={() => signOut({ callbackUrl: "/log-in" })}>
        Log out
      </button>
    </div>
  );
};

export default HomePage;
