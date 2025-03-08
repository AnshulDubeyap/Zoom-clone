//!-- Custom hook for Getting to know within which call we currently in
//? After Step-4 in Meeting Page

import { useState, useEffect } from "react";
import { Call } from "@stream-io/video-react-sdk";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

const useGetCallById = (id: string | string[]) => {
  //!-- Here we define the call

  //!-- Step-1, Initialize the State of type Call
  const [call, setCall] = useState<Call>();

  //!-- Step-2, Create a Loading State
  const [isCallLoading, setIsCallLoading] = useState(true);

  //!-- Step-3, Get Access to Client
  const client = useStreamVideoClient();

  //!-- Step-4, UseEffect to start fetching call
  useEffect(() => {
    //!-- Step-4-1, Check if the client is present
    if (!client) return;

    //!-- Step-4-2, if it does, create loadCall
    const loadCall = async () => {
      const { calls } = await client.queryCalls({ filter_conditions: { id } });

      if (calls.length > 0) {
        setCall(calls[0]);
        setIsCallLoading(false);
      }
    };

    //!-- Step-4-3, Call the loadCall function
    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};

export default useGetCallById;
