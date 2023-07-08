import React from "react";
import readableTimeUtils from "../../utils/readableTime";

const Time = ({ timestamp }) => {
  return (
    <span className="time tooltip">
      {readableTimeUtils.readableTime(timestamp)}
    </span>
  );
};

export default Time;
