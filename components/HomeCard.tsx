//!-- HomeCard Component as part of reusable component

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

//!-- Typescript Decryption
//? We are using typescript, thus we have to define the type of HomeCardProps, interface in typescript serves a blueprint for objects, specifying their properties and method. thus that lets us define the type of a object, that is HomeCardProps

interface HomeCardProps {
  img: string;
  title: string;
  description: string;
  HandelClick: () => void;
  className?: string;
}

const HomeCard = ({
  img,
  title,
  description,
  HandelClick,
  className,
}: HomeCardProps) => {
  return (
    //!-- Step-1 Create a HomeCard Component
    <div
      className={cn(
        " px-1 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
        className
      )}
      onClick={HandelClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[12px]">
        <Image src={img} alt="Meeting" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold px-3">{title}</h1>
        <p className="text-lg font-normal px-3">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
