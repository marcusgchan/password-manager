import React from "react";

const Notifier = ({
  type,
  message,
}: {
  type: "ERROR" | "SUCCESS";
  message: string | undefined;
}) => {
  return <div>ℹ️ {message}</div>;
};

export default Notifier;
