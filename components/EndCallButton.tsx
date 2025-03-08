//!-- End Call Button Component (For render in the MeetingRoom Component)
"use client";

import React from "react";
import { useCall } from "@stream-io/video-react-sdk";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  //!-- Step-4 Import useRouter()
  const router = useRouter();

  //!-- Step-1 Get Access about info of Call
  const call = useCall();

  //!-- Step-2Get Access to Local Participant
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  //!-- Step-3 Check If we are Meeting Owner
  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  //!-- Step-3-1 If we are not Meeting Owner then return null
  if (!isMeetingOwner) return null;

  //!-- Step-3-2 If we are Meeting Owner then Render the Button
  return (
    <Button
      className="bg-red-500"
      onClick={async () => {
        await call?.endCall();
        router.push("/");
      }}
    >
      End Call for Everyone
    </Button>
  );
};

export default EndCallButton;
