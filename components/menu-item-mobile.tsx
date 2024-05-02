import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  Icon: LucideIcon;
  label: string;
};

export const MenuItemMobile = ({ href, Icon, label }: Props) => {
  return (
    <li
      className={cn(
        buttonVariants({
          variant: "menuItemMobile",
        }),
        "px-0",
      )}
    >
      <SheetClose asChild>
        <Link href={href} className="flex w-full items-center gap-2">
          {<Icon className="h-6 w-6" />}
          {label}
        </Link>
      </SheetClose>
    </li>
  );
};
