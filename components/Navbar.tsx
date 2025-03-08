//!-- Navbar Component
"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

//!-- Step-1 Create a Navbar Component
const Navbar = () => {
  return (
    <nav className="flex-between fixed  z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 ">
      <Link href="/" className="flex items-center gap-1 ">
        <Image
          src={"icons/logo.svg"}
          alt="Yoom logo"
          width={32}
          height={32}
          className="max-sm:w-10 max-sm:h-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Yoom
        </p>
      </Link>

      {/*Step-2 Mobile Navigation */}

      <div className="flex-between gap-5">
        {/* Clerk User Management */}
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* Component Mobile Navigation */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
