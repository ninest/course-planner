import { format } from "date-fns";

export const DAYS = [
  { name: "Sunday", shortName: "Sun", singleChar: "S" },
  { name: "Monday", shortName: "Mon", singleChar: "M" },
  { name: "Tuesday", shortName: "Tue", singleChar: "T" },
  { name: "Wednesday", shortName: "Wed", singleChar: "W" },
  { name: "Thursday", shortName: "Thu", singleChar: "R" },
  { name: "Friday", shortName: "Fri", singleChar: "F" },
  { name: "Saturday", shortName: "Sat", singleChar: "S" },
];
export const WEEK_DAYS = DAYS.slice(1, 6);

export const TIME_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

export const formatDate = (date: Date) => {
  return format(date, "MMMM d, yyyy");
};
