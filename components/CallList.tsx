//!-- CallList Component (For render in the Upcoming, Previous and Recordings Pages)
"use client";
//@ts-ignore

import React from "react";
import { useGetCalls } from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CallRecording } from "@stream-io/video-react-sdk";
import { Call } from "@stream-io/video-react-sdk";
import MeetingCard from "@/components/MeetingCard";
import Loader from "./Loader";
import { useEffect } from "react";
import { toast } from "sonner";

//!-- Step-1 Create a CallList Component
//? CallList Component has a type prop, which is a string, that is either "ended", "upcoming" or "previous"

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  //!-- Step-2 Fetch the Calls
  //? To fetch the Calls we need to create a custom hook useGetCalls
  const { isLoading, endedCalls, upcomingCalls, callRecordings } =
    useGetCalls();

  //!-- Step-3 To know which page we are on , we use useRouter
  const router = useRouter();

  //!-- Step-5 For recordings create a new page
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  //!-- Step-4 Function will return the calls based on the type of the page we are on
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };

  //!-- Step-6 Function will return the message based on the type of the page we are on
  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  //!-- Step-8 UseEffect to fetch the recordings
  useEffect(() => {
    try {
      const fetchRecordings = async () => {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );

        const recordings = callData
          .filter((call) => {
            call.recordings.length > 0;
          })
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      };
      if (type === "recordings") fetchRecordings();
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch recordings");
    }
  }, [callRecordings, type]);

  //!-- Step-6-1 Get the Calls and Message
  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  //!-- Step-7 Create Call List Component

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {/* Step-7-1 Map over the calls, calls if present and calls length is greater than 0, then map over it and return the MeetingCard component if not return the call message */}
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call)?.id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/Video.svg"
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 20) ||
              "Personal Meeting"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
