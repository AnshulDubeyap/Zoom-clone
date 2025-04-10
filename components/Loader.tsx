//!-- Loader Component if VideoClient does not exist

import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Image
        src={"/icons/loading-circle.svg"}
        alt="loader"
        width={50}
        height={52}
      />
    </div>
  );
};

export default Loader;
