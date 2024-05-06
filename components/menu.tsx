"use client";

import { Globe, Search, Send, Settings, Smile } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuItem } from "@/components/menu-item";
import { Button } from "@/components/ui/button";

export const Menu = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const username = session?.user.username;

  return (
    <nav className="h-full w-full">
      <ul className="flex h-full flex-col items-start justify-between">
        <div />
        <div className="flex flex-col gap-7">
          <MenuItem href="/" pathname={pathname} Icon={Globe} label="Explore" />
          <MenuItem
            href={`/profile/${username}`}
            pathname={pathname}
            Icon={Smile}
            label="Profile"
          />
          <MenuItem
            href="/search"
            pathname={pathname}
            Icon={Search}
            label="Search"
          />
        </div>
        <div className="mb-12 flex w-full flex-col gap-5">
          {session ? (
            <>
              <MenuItem
                href="/submit"
                pathname={pathname}
                Icon={Send}
                label="Submit"
              />
              <MenuItem
                href="/account"
                pathname={pathname}
                Icon={Settings}
                label="Account"
              />
            </>
          ) : (
            <>
              <Link href="/log-in">
                <Button variant="secondary">Log in</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="secondaryOutline">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};
