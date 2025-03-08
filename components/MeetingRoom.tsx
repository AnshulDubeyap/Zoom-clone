//!-- Meeting Room Component

import {
  Call,
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import React, { use } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { LayoutList, Loader, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { CallingState } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

//!-- Step-6-2 Import the DropDown from shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Layout } from "lucide-react";

//!-- Step-2-1 Creating type of CallLayout
type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  //!-- Step-9 With Prams figure out that we are a private owner
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  //? We are searching the 'personal' param in the url with query
  //? !! here converts the falsy or truthy values to true or false boolean

  //!-- Step-1 Create a MeetingRoom Component

  //!-- Step-2 State to hold the CallLayout
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");

  //!-- Step-3-1 State to Show the hidden participants
  const [showParticipants, setShowParticipants] = useState(false);

  //!-- Step-5-2 Router for the Leaving Function
  const router = useRouter();

  //!-- Step-10 Get the useCallStateHooks
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  //!-- Step-10-1 Check if callingState = Joined
  if (callingState !== CallingState.JOINED) return <Loader />;

  //!-- Step-2-2 Function to change the layout
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          {/* Step-3 Render the CallLayout */}
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-70px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
          {/* Step-4 Render the Participants */}
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        {/* Step-5 Render the Call Controls */}
        {/* Step-5-1 Define a on leave function so once we click exit button we can leave the call */}
        <CallControls onLeave={() => router.push("/")} />
        {/* Step-6-1 Render the DropDown to change the layout */}
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535d]">
              {/* Step-6-3 Render Icon LayoutList */}
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer "
                  onClick={() =>
                    setLayout(item.toLocaleLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Step-7 Render the CallStatsButton */}
        <CallStatsButton />
        {/* Step-8 Render the button to show the hidden participants */}
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535d]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {/* Step-9-1 Render the EndCallButton Component if It is a PersonalRoom */}
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
