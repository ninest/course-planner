import { CalendarEvent } from "@/types";
import { describe, expect, test } from "vitest";
import { isConflict } from "./conflict";

describe("conflict", () => {
  const eventA: CalendarEvent = {
    day: 0,
    name: "Sunday",
    startTime: { hour: 9, minute: 0 },
    endTime: { hour: 10, minute: 0 },
  };
  const eventB: CalendarEvent = {
    day: 0,
    name: "Sunday",
    startTime: { hour: 10, minute: 0 },
    endTime: { hour: 11, minute: 0 },
  };
  const eventC: CalendarEvent = {
    day: 1,
    name: "Sunday",
    startTime: { hour: 9, minute: 35 },
    endTime: { hour: 10, minute: 35 },
  };
  const eventD: CalendarEvent = {
    day: 0,
    name: "Sunday",
    startTime: { hour: 9, minute: 30 },
    endTime: { hour: 10, minute: 30 },
  };
  const eventE: CalendarEvent = {
    day: 0,
    name: "Sunday",
    startTime: { hour: 8, minute: 45 },
    endTime: { hour: 10, minute: 45 },
  };
  const eventF: CalendarEvent = {
    day: 0,
    name: "Sunday",
    startTime: { hour: 9, minute: 2 },
    endTime: { hour: 9, minute: 58 },
  };
  const eventG: CalendarEvent = {
    day: 0,
    name: "Sunday",
    startTime: { hour: 8, minute: 58 },
    endTime: { hour: 10, minute: 2 },
  };

  test("two events do not conflict", () => {
    expect(isConflict(eventA, eventB)).toBe(false);
    expect(isConflict(eventA, eventC)).toBe(false);
  });

  test("two events that conflict", () => {
    expect(isConflict(eventA, eventD)).toBe(true);
    expect(isConflict(eventD, eventA)).toBe(true);
    expect(isConflict(eventA, eventE)).toBe(true);
    expect(isConflict(eventE, eventA)).toBe(true);
    expect(isConflict(eventE, eventD)).toBe(true);
    expect(isConflict(eventD, eventE)).toBe(true);
    expect(isConflict(eventA, eventF)).toBe(true);
    expect(isConflict(eventF, eventA)).toBe(true);
    expect(isConflict(eventA, eventG)).toBe(true);
    expect(isConflict(eventG, eventA)).toBe(true);
  });
});
