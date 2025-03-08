"use client";

//!-- Meeting Setup Component

import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Loader from "@/components/Loader";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  //!-- Step-2 State variable for video enabling via localhost
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  //!--Step-3 Have Access to call
  const call = useCall();

  //!-- Step-5 Changes in isMicCamToggledOn, call.camera, call.microphone will trigger useEffect
  useEffect(() => {
    if (isMicCamToggledOn) {
      //!-- Step-5-1 if Turned on disable video and audio
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      //!-- Step-5-2 if Turned off enable video and audio
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  if (!call) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      {/* Step-1 Render the Video Preview */}
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => {
              setIsMicCamToggledOn(e.target.checked);
            }}
          />
          Join with mic and cam off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join
      </Button>
    </div>
  );
};

export default MeetingSetup;
