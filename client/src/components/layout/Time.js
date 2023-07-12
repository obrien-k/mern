import React from "react";
import readableTimeUtils from "../../utils/readableTime";

const Time = ({ timestamp }) => {
  const formattedTime = readableTimeUtils.timeAgo(timestamp);
  if (formattedTime === "Never") {
    return <span className="time tooltip">Never</span>;
  }
  return (
    <span className="time tooltip" title={timestamp}>
      {" "}
      {formattedTime}
    </span>
  );
};

export default Time;
