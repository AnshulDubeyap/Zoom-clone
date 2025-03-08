//!-- Personal Room Page
"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useGetCallById from "@/hooks/useGetCallById";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

//!-- Step-2 Create a functional component Table
const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row ">
    <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32 ">
      {title}
    </h1>
    <h1 className="truncate text-sm font-bold text-sky-1 lg:text-xl">
      {description}
    </h1>
  </div>
);

//!-- Step-1 Create a Personal room component
const PersonalRoom = () => {
  //!-- Step-3 Get the user
  const { user } = useUser();

  //!-- Personal room so meeting_id = userid
  const meetingId = user?.id;

  //!-- Get the call
  const { call } = useGetCallById(meetingId!);

  //!-- Get the client
  const client = useStreamVideoClient();

  //!-- Router
  const router = useRouter();

  //!-- Function to create a new meeting room
  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  //!-- Meeting Link
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting Id" description={`${meetingId!}`} />
        <Table title="Invite Link" description={`${meetingLink}`} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied");
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};
export default PersonalRoom;
