import React from "react";
import { Notifier } from "../types";
import { useSpring, animated } from "@react-spring/web";

const Notifier = ({ messageQueue }: { messageQueue: Notifier[] }) => {
  const length = messageQueue.length;
  if (length > 0) {
    const firstErrorMessage = messageQueue[0].message;
    return (
      <div className="fixed top-0 left-1/2 -translate-x-1/2 bg-violet p-2 rounded-md">
        ℹ️ {firstErrorMessage}
      </div>
    );
  }
  return (
    // <div className={`fixed -top-6 left-1/2 -translate-x-1/2 transition-transform translate-y-full p-2 rounded-md bg-violet`}>
    //   ℹ️ {"test"}
    // </div>
    null
  );
};

export default Notifier;
