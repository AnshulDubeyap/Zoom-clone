//!-- Sidebar Component

"use client";

import { sidebarLinks } from "@/constants/index";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  //!--Step-3 Get the current pathname
  //? We use `usePathname` from `next/navigation` to get the current URL path
  const pathName = usePathname();

  //!-- Step-1 Create a Sidebar Section
  return (
    <section className="sticky top-0 left-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:[w-264px]">
      <div className="flex flex-1 flex-col gap-6">
        {/*!-- Step-2 Create a SidebarLinks Array and map over it, to dynamically render each link */}
        {sidebarLinks.map((link) => {
          {
            /*Step-4 Determine if the link is active based on the current pathname, because we need to apply a different background color (bg-blue-1) to the link if it's active*/
          }
          const isActive =
            pathName === link.route || pathName.startsWith(`${link.route}/`);

          {
            /* cn- conditional className, if isActive is true it render bg-blue-1 */
          }
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                isActive && "bg-blue-1"
              )}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
