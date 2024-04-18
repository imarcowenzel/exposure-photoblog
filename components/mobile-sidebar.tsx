import { Menu as MenuIcon } from "lucide-react";

import { MenuMobile } from "@/components/menu-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="text-primary" />
      </SheetTrigger>
      <SheetContent className="z-[100] w-full px-0 pt-20 flex flex-col gap-7">
        <MenuMobile />
      </SheetContent>
    </Sheet>
  );
};
