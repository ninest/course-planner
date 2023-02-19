import { CalendarEvent } from "@/types";

// Return a list of a list of events that have conflicts
export const getConflictList = (events: CalendarEvent[]) => {
  const conflicts: Map<CalendarEvent, CalendarEvent[]> = new Map();
  for (const eventA of events) {
    conflicts.set(eventA, []);
    for (const eventB of events) {
      if (eventA == eventB) continue;
      if (isConflict(eventA, eventB)) {
        conflicts.set(eventA, [...(conflicts.get(eventA) ?? []), eventB]);
      }
    }
  }
  // console.log(conflicts);

  return conflicts;
};

export const isConflict = (eventA: CalendarEvent, eventB: CalendarEvent) => {
  if (eventA.day !== eventB.day) return false;

  const startA = eventA.startTime.hour * 60 + eventA.startTime.minute;
  const endA = eventA.endTime.hour * 60 + eventA.endTime.minute;
  const startB = eventB.startTime.hour * 60 + eventB.startTime.minute;
  const endB = eventB.endTime.hour * 60 + eventB.endTime.minute;

  const durationA = endA - startA;
  const durationB = endB - startB;

  const totalDuration = durationA + durationB;
  let totalTimeBetween: number;

  // 9-10, 10-11
  if (startA < endB) totalTimeBetween = endB - startA;
  // 10-11, 9-10
  else if (endA > startB) totalTimeBetween = endA - startB;

  const eventsConflicting = totalTimeBetween! < totalDuration;

  return eventsConflicting;
};
