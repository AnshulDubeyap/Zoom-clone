//!-- Stream Actions,
//? This comes after Setting up the client in the StreamClientProvider, before creating the token to verify the user if indeed it the user
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  try {
    //!-- We will get the token here
    //!-- Step-1 Get the user from clerk
    const user = await currentUser();

    if (!user) throw new Error("User not found");
    if (!apiKey) throw new Error("API Key not found");
    if (!apiSecret) throw new Error("API Secret not found");

    //!--Step-2 Create a client
    const client = new StreamClient(apiKey, apiSecret);

    //!--Step-3 Generate the token
    //!--Step-3 Generate the token
    const token = client.generateUserToken({
      user_id: user.id,
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

export default tokenProvider;
