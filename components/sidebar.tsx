import { Contrast } from "lucide-react";
import Link from "next/link";

import { Menu } from "@/components/menu";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-[101] hidden h-screen w-32 items-center bg-primary p-4 text-primary lg:flex lg:flex-col">
      <div>
        <Link href="/" className="flex items-center gap-x-2">
          <Contrast className="h-7 w-7" />
          <h1 className="text-xs font-medium uppercase">Exposure</h1>
        </Link>
      </div>
      <Menu />
    </aside>
  );
};
