import formatDate from "./formatDate.js";

function secondsToUnits(seconds) {
  const units = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  const res = {};
  let remainingSeconds = seconds;

  for (const [name, secondsInUnit] of Object.entries(units)) {
    if (remainingSeconds < secondsInUnit) continue;
    res[name] = Math.floor(remainingSeconds / secondsInUnit);
    remainingSeconds %= secondsInUnit;
  }

  return res;
}

const readableTime = (timestamp) => {
  if (timestamp === null) {
    return false;
  }
  const now = Date.now();
  if (typeof timestamp === "number") {
    return timestamp;
  } else if (timestamp === "0000-00-00 00:00:00") {
    return false;
  } else {
    const time = Date.parse(timestamp);
    return Math.floor((now - time) / 1000); // returns in seconds
  }
};

const timeDiff = (
  timestamp,
  levels = 2,
  span = true,
  lowercase = false,
  starttime = false
) => {
  starttime = starttime === false ? Date.now() : Date.parse(starttime);

  if (!Number.isInteger(timestamp)) {
    if (timestamp === "0000-00-00 00:00:00") {
      return "Never";
    }
    timestamp = Date.parse(timestamp);
  }
  if (timestamp === 0) {
    return "Never";
  }
  let time = Math.floor((starttime - timestamp) / 1000); // convert to seconds

  // If the time is negative, then it expires in the future.
  let HideAgo = false;
  if (time < 0) {
    time = -time;
    HideAgo = true;
  }

  // Convert seconds to other units
  const units = secondsToUnits(time);

  // Construct the time diff string
  let returnStr = "";
  let level = 0;
  for (const [unit, value] of Object.entries(units)) {
    if (level >= levels) break;
    returnStr += `${value} ${unit}${value > 1 ? "s" : ""} `;
    level++;
  }

  if (HideAgo) {
    returnStr += "from now";
  } else if (returnStr !== "") {
    returnStr += "ago";
  } else {
    returnStr = "just now";
  }

  // Convert to lowercase if needed
  if (lowercase) {
    returnStr = returnStr.toLowerCase();
  }

  // Add the HTML span, convert to lowercase, etc. according to the parameters
  if (span) {
    return `<span class="time tooltip" title="${formatDate(
      new Date(timestamp)
    )}">${returnStr}</span>`;
  } else {
    return returnStr;
  }
};

const convertHours = (hours, levels = 2, span = true) => {
  const seconds = hours * 3600;
  return this.timeDiff(seconds * 1000, levels, span, true, false);
};

const timeOffset = (offset = 0, fuzzy = false) => {
  let time = new Date();
  time.setSeconds(time.getSeconds() + offset);
  if (fuzzy) {
    let startOfDay = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate()
    );
    return formatDate(startOfDay);
  } else {
    return formatDate(time);
  }
};

const sqlTime = (timestamp = false) => {
  if (timestamp) {
    return new Date(timestamp * 1000);
  } else {
    return new Date();
  }
};

const isValidDate = (date) => {
  const timestamp = Date.parse(date);
  return isNaN(timestamp) ? false : true;
};

const isValidTime = (time) => {
  const [hours, minutes] = time.split(":");
  if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
    return true;
  }
  return false;
};

const isValidDateTime = (date_time, format = "YYYY-MM-DD HH:mm") => {
  if (format !== "YYYY-MM-DD HH:mm") {
    throw new Error("Unsupported format.");
  }
  const [date, time] = date_time.split(" ");
  return this.isValidDate(date) && this.isValidTime(time);
};

export default {
  readableTime,
  timeDiff,
  convertHours,
  timeOffset,
  sqlTime,
  isValidDate,
  isValidTime,
  isValidDateTime,
};
