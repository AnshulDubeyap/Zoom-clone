//!-- Home Page
import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

const Home = () => {
  //!-- Step-1 Create a Home Component

  //!-- Step-3 Get the Current Time and Date
  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
  }).format(now);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      {/* Step-2-0 Display the Banner (bg-hero, bg-cover) */}
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex flex-col h-ful justify-between w-full max-md:px-5 max-md:py-8 lg:py-11">
          {/* 2-1 Display the Meeting Time */}
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:00 PM{" "}
          </h2>

          {/* 2-2 Display Current Date and Time */}

          <div className="flex flex-col gap-2 ">
            <h1 className="text-4xl px-4 font-extrabold lg:text-7xl ">
              {time}
            </h1>
            <p className="text-lg px-4 font-medium text-sky-1 lg:text-2xl ">
              {date}
            </p>
          </div>
        </div>
      </div>
      {/* Step-4 MeetingTypeList Component */}
      {/* We define this in another component because it is a client side component and HomePage is a server side component */}
      <MeetingTypeList />
    </section>
  );
};

export default Home;
