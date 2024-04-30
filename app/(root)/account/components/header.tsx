"use client";

import { InfoIcon, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export const Header = () => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col items-center gap-y-2">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
          <InfoIcon className="text-2xl text-primary" />
        </span>
        <p className="text-xs font-semibold">My Info</p>
      </div>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/log-in" })}
        className="flex flex-col items-center gap-y-2"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
          <LogOutIcon className="cursor-pointer text-2xl text-primary" />
        </span>
        <p className="cursor-pointer text-xs font-semibold">Sign Out</p>
      </button>
    </div>
  );
};
