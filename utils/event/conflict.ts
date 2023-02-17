import { CalendarEvent } from "@/types";

// Return a list of a list of events that have conflicts
export const getConflictList = (events: CalendarEvent) => {};

export const isConflict = (eventA: CalendarEvent, eventB: CalendarEvent) => {
  if (eventA.day !== eventB.day) return false;

  const startA = eventA.startTime.hour * 60 + eventA.startTime.minute;
  const endA = eventA.endTime.hour * 60 + eventA.endTime.minute;
  const startB = eventB.startTime.hour * 60 + eventB.startTime.minute;
  const endB = eventB.endTime.hour * 60 + eventB.endTime.minute;

  const durationA = endA - startA;
  const durationB = endB - startB;

  return Math.abs(endB - startA) < durationA + durationB;
};
