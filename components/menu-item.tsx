import { LucideIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  pathname: string;
  Icon: LucideIcon;
  label: string;
};

export const MenuItem = ({ href, Icon, label, pathname }: Props) => (
  <li
    className={
      (cn(
        buttonVariants({
          variant: "menuItem",
        }),
      ),
      "px-0")
    }
  >
    <Link
      href={href}
      className={cn(
        "flex w-full items-center gap-2 text-base text-secondary",
        pathname === href && "text-primary",
      )}
    >
      <Icon className="h-6 w-6" />
      {label}
    </Link>
  </li>
);
