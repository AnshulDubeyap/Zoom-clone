"use client";

//!-- Meeting Page

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCallProvider, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import useGetCallById from "@/hooks/useGetCallById";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";

const Meeting = () => {
  //!-- Get the id
  const { id } = useParams();

  if (!id) {
    throw new Error("ID parameter is required but was not found.");
  }

  //!-- Step-1 Grab the clerk user
  const { user, isLoaded } = useUser();

  //!-- Step-3-2 Initialize the State variable for Audio and Video enabling
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  //!-- Step-4-2 Get Call, isCallLoading from custom hook useGetCallById
  const { call, isCallLoading } = useGetCallById(id);

  //!-- Step-4-3 Create a loader
  if (!isLoaded || !user || isCallLoading) return <Loader />;

  //* We are using Typescript thus we mention type of params that is params: { id: string }
  return (
    <main className="h-screen w-full">
      {/* Step-2 Render the Stream Call and Stream Theme */}
      {/* Step-4 Creating a custom hook to know within which call we currently 
      in*/}

      <StreamCallProvider call={call}>
        <StreamTheme>
          {/* Step-3 Check if Audio and Video is enabled, For this define a State variable */}
          {/* if IsSetupComplete is not true then show Meeting Setup else show Meeting Room */}
          {isSetupComplete ? (
            <MeetingRoom />
          ) : (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          )}
        </StreamTheme>
      </StreamCallProvider>
    </main>
  );
};

export default Meeting;
