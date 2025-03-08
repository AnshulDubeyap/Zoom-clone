//!-- Custom hook for Fetching the Calls

import { useState } from "react";
import { Call } from "@stream-io/video-react-sdk";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export const useGetCalls = () => {
  //!-- Step-1, Create a State to load the Calls
  const [calls, setCalls] = useState<Call[]>([]);

  //!-- Step-3 Create a Loading State to check if the calls are being loaded or not
  const [isLoading, setIsLoading] = useState(false);

  //!-- Step-2, To get Calls , get the client
  const client = useStreamVideoClient();

  //!-- Step-4, Fetch calls for specific user, get the user
  const { user } = useUser();

  //!-- Step-5 UseEffect to fetch the calls
  useEffect(() => {
    //!-- Function LoadCalls
    //? We cannot pass async directly to useEffect, so we need to create a function loadCalls
    const loadCalls = async () => {
      //!-- Step-5-1, Check if the client and user is present
      if (!client || !user?.id) return;

      //!-- Step-5-2, If yes, Set the loading state to true
      setIsLoading(true);

      //!-- Step-5-3 Try to fetch the calls
      try {
        const { calls } = await client.queryCalls({
          sort: [
            {
              field: "starts_at",
              direction: -1,
            },
          ],
          filter_conditions: {
            starts_at: {
              $exists: true,
            },
            $or: [
              {
                created_by_user_id: user.id,
              },
              {
                members: { $in: [user.id] },
              },
            ],
          },
        });
        //* update the state
        setCalls(calls);
        //!-- Step-5-4 Catch Error
      } catch (error) {
        console.error("Error fetching calls:", error);
      } finally {
        //!-- Step-5-5 Wether we succeed or fail, set the loading state to false
        setIsLoading(false);
      }
    };
    //!-- Step-5-6 Call the loadCalls function
    loadCalls();
  }, [client, user?.id]);

  //!-- Step-6 Filter out the endedCalls, upcomingCalls

  //!-- Step-6-1 Get the current data and time
  const now = new Date();
  //? if its before now then its ended, if its after now then its upcoming

  //!-- Step-6-2 Filter the calls
  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return startsAt && new Date(startsAt) < now && endedAt;
  });
  const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  //!-- Step-7 Return the All
  return { calls, isLoading, endedCalls, upcomingCalls, callRecordings: calls };
};
