//!-- MobileNav Component
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import sidebarLinks from "@/constants/index";
import { cn } from "@/lib/utils";

//!-- Import from shadcn-ui
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileNav = () => {
  //!-- Step-1 Create a MobileNav Component

  //!-- Step-7 Get the current pathname
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      {/* Step-2 Copy-Paste a Sheet from shadcn-ui, the square bracket in classname is used when you need to apply specific pixel values  */}
      <Sheet>
        <SheetTrigger asChild>
          {/* Step-3 Add a icon inside the Sheet Trigger, when clicked on icon, the sheet will open*/}
          <Image
            src={"icons/hamburger.svg"}
            alt={"Hamburger icon"}
            width={32}
            height={32}
            className={"cursor-pointer sm:hidden"}
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-dark-1 border-none ">
          {/* Step-4 Add a logo inside the Sheet Content (Just copy-paste from Navbar) */}
          <Link href="/" className="flex items-center gap-1 ">
            <Image
              src={"icons/logo.svg"}
              alt="Yoom logo"
              width={32}
              height={32}
              className="max-sm:w-10 max-sm:h-10"
            />
            <p className="text-[26px] font-extrabold text-white ">Yoom</p>
          </Link>

          {/* Step-5 Add a navigation inside the Sheet Content */}

          <div className="flex flex-col h-calc(100vh-72px) justify-between overflow-y-auto">
            {/* h-[calc(100vh-72px)], 72px is the height of the navbar, thus we want the height of Nav links column to be  the height as the full viewport height (100vh) minus a fixed value (72px) */}
            {/* overflow-y-auto, so we dont have a scroll bar */}
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white ">
                {/* Step-6 Create a SidebarLinks Array and map over it, to dynamically render each link (Just copy-paste from Sidebar) */}
                {sidebarLinks.map((link) => {
                  const isActive = pathName === link.route;

                  return (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                          isActive && "bg-blue-1"
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
