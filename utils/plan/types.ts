import type { Course, Section } from "../../.data/types";
import { EventColorKey } from "../event/colors";
import { CalendarEvent } from "../event/types";

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

interface CourseSectionCalendarEvent extends CalendarEvent {
  type: "course-section";
  course: Course;
  section: Section;
}

interface AsyncOnlineSectionCalendarEvent {
  id: string;
  type: "async-online-course-section";
  title: string;
  subtitle?: string;
  description?: string;
  color?: EventColorKey;
  course: Course;
  section: Section;
}

interface OtherCalendarEvent extends CalendarEvent {
  type: "other";
}
