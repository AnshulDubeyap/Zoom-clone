//!-- Layout of Root Group (Meeting)

import StreamVideoProvider from "@/providers/StreamClientProvider";
import React, { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yoom",
  description: "Video Conferencing App",
  icons: {
    icon: "/icons/yoom-logo.svg",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  //* We are using Typescript thus we mention type of children that is children: React.ReactNode
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
