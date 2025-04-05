//!-- Meeting Type List Render in HomePage
"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MeetingTypeList = () => {
  //!-- Step-1 Create a MeetingTypeList Component

  //!-- Step-3 State variable for HandelClick functionality
  //? We can use typescript to define the exact types of this state in the state variable
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  //!-- Step-5-2 Router for the Recordings Reusable Component
  //? Router for the Recordings Component
  const router = useRouter();

  //!--Step-7 Define the CreateMeeting Function in MeetingModal props

  //* Step-1 Create a CreateMeeting Function

  //* Step-1-1 Get the user
  const { user } = useUser();

  //* Step-1-2 Initialize a StreamVideoClient
  const client = useStreamVideoClient();

  //* Step-4-2 State for the time of the meeting
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  //* Step-6-2 Set the State for Created Call
  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    //* Step-1-3 Check if the client and user is present
    //? We have created a client and user in the StreamClientProvider
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast.warning("Please select a date and time");
        return;
      }
      //* Step-2 Generate the random id
      const id = crypto.randomUUID(); //? This will generate a random id

      //* Step-3 Create the Call
      const call = client.call("default", id);

      if (!call) {
        toast.error("Failed to create call");
        throw new Error("Failed to create call");
      }

      //* Step-4 Get the time meeting Starts at
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString(); //? gives us a string of the date and time

      //* Step-5 Get the description of the meeting
      const description = values.description || "InstantMeeting";

      //* Step-6 Create the call
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      //? Once we create a call we want to set it in a State

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${id}`);
      }

      toast.success("Meeting created successfully!");
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast.error("Error creating meeting");
    }
  };

  //!-- Step-5-2 (After the MeetingRoom Setup) Create a Meeting link
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* Step-2 Create a New HomeCard Component */}
      {/* Here we are using reusable component (passing props to same component)  */}

      {/* Step-4, Pass the Set States in HandelClick */}

      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start a new instant meeting"
        HandelClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        HandelClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-blue-1"
      />

      {/* Step-5-1 Recording is a bit different, here we want to navigate to Recordings page, and not Set a State */}

      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        HandelClick={() => {
          router.push("/recordings");
        }}
        className="bg-purple-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        HandelClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-1"
      />

      {/* Step-6 Create a MeetingModal Component */}
      {/* We are going to pass the props in meeting modal to this component how to behave */}

      {/* Step-1 (After the MeetingRoom Setup) Check if we have CallDetails, if not top meetingModal for schedule meeting will pop up, if yes then below meetingModal will pop up for s */}

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          className="text-center"
          buttonText="Schedule Meeting"
          handelClick={createMeeting}
        >
          {/* Step-2 (After the MeetingRoom Setup) Create a form for schedule meeting inside the Modal */}
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            {/* Step-3 (After the MeetingRoom Setup) shadcn Textarea component */}
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            {/* Step-4 (After the MeetingRoom Setup) React DatePicker component */}
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Select a date and time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => {
                setValues({ ...values, dateTime: date! });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-1 p-2 focus:outline-none "
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handelClick={() => {
            {
              /* Step-5 (After the MeetingRoom Setup) If have callDetails then copy the meeting link, for this we have to create meeting link */
            }
            navigator.clipboard.writeText(meetingLink);
            toast.success("Meeting link copied to clipboard");
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start a Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handelClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
