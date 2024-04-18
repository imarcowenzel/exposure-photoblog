import { Contrast } from "lucide-react";
import Link from "next/link";

import { MobileSidebar } from "@/components/mobile-sidebar";

export const MobileHeader = () => {
  return (
    <nav className="flex h-[50px] items-center justify-between bg-primary p-4 lg:hidden">
      <div className="text-primary">
        <Link href="/" className="flex items-center gap-x-2">
          <Contrast className="h-7 w-7" />
          <h1 className="text-[11px] font-medium uppercase">Exposure</h1>
        </Link>
      </div>
      <MobileSidebar />
    </nav>
  );
};
