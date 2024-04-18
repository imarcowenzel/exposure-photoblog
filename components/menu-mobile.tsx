"use client";

import { Globe, Search, Send, Settings, Smile } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { MenuItemMobile } from "@/components/menu-item-mobile";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";

export const MenuMobile = () => {
  
  const { data: session } = useSession();

  const username = session?.user.username;

  console.log(session)

  return (
    <nav className="flex flex-col gap-7 px-4">
      <ul className="flex flex-col items-start gap-7">
        <MenuItemMobile href="/" Icon={Globe} label="Explore" />
        <MenuItemMobile
          href={`/${username}/profile`}
          Icon={Smile}
          label="Profile"
        />
        <MenuItemMobile
          href={`/${username}/submit`}
          Icon={Send}
          label="Submit"
        />

        {session ? (
          <>
            <MenuItemMobile href="/search" Icon={Search} label="Search" />
            <MenuItemMobile
              href={`/${username}/account`}
              Icon={Settings}
              label="Account"
            />
          </>
        ) : (
          <div className="flex w-full flex-col gap-4 text-primary md:flex-row md:items-center md:justify-between">
            <SheetClose asChild className="w-full">
              <Link href="/log-in">
                <Button variant="secondary" className="text-base">
                  Log in
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild className="w-full">
              <Link href="/sign-up">
                <Button variant="secondaryOutline" className="text-base">
                  Sign up
                </Button>
              </Link>
            </SheetClose>
          </div>
        )}
      </ul>
    </nav>
  );
};
