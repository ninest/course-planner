import { DayOfWeek, daysOfWeek } from "@/.data/types";

export const dayShortCodes: Record<DayOfWeek, string> = {
  sunday: "S",
  monday: "M",
  tuesday: "T",
  wednesday: "W",
  thursday: "R",
  friday: "F",
  saturday: "S",
};

export const dayNameToNumber = (day: DayOfWeek): number => {
  return daysOfWeek.indexOf(day);
};
