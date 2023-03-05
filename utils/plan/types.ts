import type { Course, Section } from "../../.data/types";
import { EventColorKey } from "../event/colors";
import { CalendarEvent } from "../event/types";
import { Time } from "../time/types";

export interface CoursePlan {
  id: string;
  termCode: string;
  name: string;
  description: string;
  items: (
    | CourseSectionCalendarEvent
    | AsyncOnlineSectionCalendarEvent
    | OtherCalendarEvent
  )[];
}

export interface PlanItem {
  id: string;
  type: string;
  color: EventColorKey
}

export interface CourseSectionCalendarEvent extends PlanItem {
  type: "course-section";
  course: Course;
  section: Section;
}

export interface AsyncOnlineSectionCalendarEvent extends PlanItem {
  type: "async-online-course-section";
  course: Course;
  section: Section;
}

export interface OtherCalendarEvent extends PlanItem {
  type: "other";
  title: string;
  description?: string;
  location?: string;
  days: number[];
  startTime?: Time;
  endTime?: Time;
}
