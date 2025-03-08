//!-- Setting up Stream Client
"use client";

import { ReactNode, useEffect } from "react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import tokenProvider from "@/action/stream.actions";
import Loader from "@/components/Loader";

//? Providers are components that wrap around the app and provide access to shared state, data, and functionality

//!-- Step-1 Stream Client Provider
//? Copy Paste from react docs in stream

import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";

//!-- Step-2 Get the apiKey from the .env file
const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  //!-- Step-3 Define the client
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  //? With the help of typescript we can define the type of the client that is StreamVideoClient, Which gives us the access to all the methods and properties of StreamVideoClient

  //!-- Step-4 Properly Set up the videoClient
  //? We are going to create our StreamUser directly from our currently logged in clerk user

  //!-- Step-4-1 Get the logged in user details from clerk
  //? We are using the useUser hook from clerk to get the logged in user details
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!API_KEY) throw new Error("Stream API Key is not defined");

    //!-- Step-4-2 Only if user and api key is present, create a Client
    const client = new StreamVideoClient({
      //? The client must have a apiKey
      apiKey: API_KEY,
      //? The client must have a user
      user: {
        //? Inside the user we have the id, name and image
        id: user?.id,
        name: user?.firstName || user?.id,
        image: user?.imageUrl,
      },
      //? The tokenProvider is a function verifies if the user is indeed the user
      //? The tokenProvider checks the user with the help of stream secret key, for that we need a server side code, that we created in actions folder
      //!-- Step-5 Create stream.actions in server side actions
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]); //? Whenever the user changes or isLoaded changes, will Trigger the useEffect hook

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
