//!-- Meeting Modal Render in HomePage
import React, { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

//!-- Step-2 Create a MeetingModalProps Interface
interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void; //? onclose is a function that doesn't return anything
  title: string;
  className?: string; //? className is optional
  children?: ReactNode; //? children is optional
  handelClick?: () => void; //? handelClick is optional, its a function that doesn't return anything
  buttonText?: string; //? buttonText is optional
  image?: string; //? image is optional
  buttonIcon?: string; //? buttonIcon is optional
}

//!-- Step-3 Shadcn Imports
//? Our Meeting Modal is a shadcn dialog component
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";

//!-- Step-1 Create a MeetingModal Component
//? importing props from MeetingTypeList component
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handelClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  //!-- Step-4 Copy-Paste the Dialog component from shadcn
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {/* If we have access to image, then display the div */}
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          {/* Always display this h1 */}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {/* If we have access to children, then display the children */}
          {children}
          <Button
            className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handelClick}
          >
            {/* If we have access to buttonIcon, then display the buttonIcon */}
            {buttonIcon && (
              <Image src={buttonIcon} alt="buttonIcon" width={13} height={13} />
            )}
            {/* &nbsp; is a space we provide between the buttonIcon and the buttonText */}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
