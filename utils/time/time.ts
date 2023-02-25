import { Time } from "./types";

// 0805 to 08:00
export const stringTimeToDisplayTime = (stringTime: string) => {
  return stringTime.substring(0, 2) + ":" + stringTime.substring(2, 4);
};

export const stringTimeToTime = (stringTime: string): Time => {
  const hour = parseInt(stringTime.substring(0, 2));
  const minute = parseInt(stringTime.substring(2, 4));
  return { hour, minute };
};
