import { CalendarEvent } from "@/types";
import { describe, expect, test } from "vitest";
import { getConflictList, isConflict } from "./conflict";

const eventA: CalendarEvent = {
  day: 0,
  name: "Sunday A",
  startTime: { hour: 9, minute: 0 },
  endTime: { hour: 10, minute: 0 },
};
const eventB: CalendarEvent = {
  day: 0,
  name: "Sunday B",
  startTime: { hour: 10, minute: 0 },
  endTime: { hour: 11, minute: 0 },
};
const eventC: CalendarEvent = {
  day: 1,
  name: "Sunday C",
  startTime: { hour: 9, minute: 35 },
  endTime: { hour: 10, minute: 35 },
};
const eventD: CalendarEvent = {
  day: 0,
  name: "Sunday D",
  startTime: { hour: 9, minute: 30 },
  endTime: { hour: 10, minute: 30 },
};
const eventE: CalendarEvent = {
  day: 0,
  name: "Sunday E",
  startTime: { hour: 8, minute: 45 },
  endTime: { hour: 10, minute: 45 },
};
const eventF: CalendarEvent = {
  day: 0,
  name: "Sunday F",
  startTime: { hour: 9, minute: 2 },
  endTime: { hour: 9, minute: 58 },
};
const eventG: CalendarEvent = {
  day: 0,
  name: "Sunday G",
  startTime: { hour: 8, minute: 58 },
  endTime: { hour: 10, minute: 2 },
};
const eventH: CalendarEvent = {
  day: 0,
  name: "Sunday H",
  startTime: { hour: 11, minute: 58 },
  endTime: { hour: 12, minute: 2 },
};
const eventI: CalendarEvent = {
  day: 1,
  name: "Saturday I",
  startTime: { hour: 9, minute: 0 },
  endTime: { hour: 10, minute: 0 },
};

describe("conflict", () => {
  test("two events do not conflict", () => {
    expect(isConflict(eventA, eventB)).toBe(false);
    expect(isConflict(eventB, eventA)).toBe(false);
    expect(isConflict(eventA, eventC)).toBe(false);
    expect(isConflict(eventA, eventI)).toBe(false);
    expect(isConflict(eventI, eventA)).toBe(false);
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

describe("conflict groups", () => {
  test("no conflicts", () => {
    const actualConflictsA = getConflictList([eventA, eventB]);
    const expectedConflictA = new Map();
    expectedConflictA.set(eventA, []);
    expectedConflictA.set(eventB, []);
    expect(actualConflictsA).toStrictEqual(expectedConflictA);

    const actualConflictsB = getConflictList([eventA, eventB, eventH]);
    const expectedConflictB = new Map();
    expectedConflictB.set(eventA, []);
    expectedConflictB.set(eventB, []);
    expectedConflictB.set(eventH, []);
    expect(actualConflictsB).toStrictEqual(expectedConflictB);
  });

  test("events conflict", () => {
    const actualConflictsA = getConflictList([eventA, eventD]);
    expect(actualConflictsA.get(eventA)).toStrictEqual([eventD]);
    expect(actualConflictsA.get(eventD)).toStrictEqual([eventA]);

    const actualConflictsB = getConflictList([
      eventA,
      eventD,
      eventE,
      eventG,
      eventI,
    ]);

    expect(actualConflictsB.get(eventA)).toStrictEqual([
      eventD,
      eventE,
      eventG,
    ]);
    expect(actualConflictsB.get(eventD)).toStrictEqual([
      eventA,
      eventE,
      eventG,
    ]);
    expect(actualConflictsB.get(eventE)).toStrictEqual([
      eventA,
      eventD,
      eventG,
    ]);
    expect(actualConflictsB.get(eventG)).toStrictEqual([
      eventA,
      eventD,
      eventE,
    ]);
    expect(actualConflictsB.get(eventI)).toStrictEqual([]);
  });
});
