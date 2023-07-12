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

const timeAgo = (timestamp) => {
  if (timestamp === null) {
    return "Never";
  }
  const now = Date.now();
  if (typeof timestamp === "number") {
    return timeDiff(Math.floor(timestamp / 1000)); // Convert milliseconds to seconds
  } else if (
    timestamp instanceof Date ||
    (typeof timestamp === "string" && !isNaN(Date.parse(timestamp)))
  ) {
    // ISO 8601 string or Date object
    const time = Date.parse(timestamp);
    const seconds = Math.floor((now - time) / 1000); // Convert to seconds
    return timeDiff(seconds); // Pass the time difference in seconds directly
  } else {
    return "Invalid date";
  }
};

const timeDiff = (seconds, levels = 2) => {
  // Convert seconds to other units
  const units = secondsToUnits(seconds);

  // Construct the time diff string
  let returnStr = "";
  let level = 0;
  for (const [unit, value] of Object.entries(units)) {
    if (level >= levels) break;
    if (value > 0) {
      returnStr += `${value} ${unit}${value > 1 ? "s" : ""} `;
      level++;
    }
  }

  if (seconds < 0) {
    returnStr += "from now";
  } else if (returnStr === "") {
    returnStr = "just now";
  } else {
    returnStr += "ago";
  }

  return returnStr;
};

const convertHours = (hours, levels = 2, span = true) => {
  const seconds = hours * 3600;
  return timeDiff(seconds * 1000, levels, span, true, false);
};

const timePlus = (offset) => {
  let time = new Date();
  time.setSeconds(time.getSeconds() + offset);
  return formatDate(time);
};

const timeMinus = (offset, fuzzy = false) => {
  let time = new Date();
  time.setSeconds(time.getSeconds() - offset);
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

const validDate = (dateString) => {
  const [date, time] = dateString.split(" ");
  const [year, month, day] = date.split("-");
  const [hours, minutes, seconds] = time.split(":");
  const isValid =
    !isNaN(Date.parse(dateString)) &&
    year !== "0000" &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31 &&
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59 &&
    seconds >= 0 &&
    seconds <= 59;
  return isValid;
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
  return isValidDate(date) && isValidTime(time);
};

export default {
  timeAgo,
  timeDiff,
  timeMinus,
  timePlus,
  convertHours,
  timeOffset,
  sqlTime,
  validDate,
  isValidDate,
  isValidTime,
  isValidDateTime,
};
