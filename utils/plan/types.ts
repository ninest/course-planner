import type { Course, Section } from "../../.data/types";
import { CalendarEvent } from "../event/types";

export interface CoursePlan {
  id: string;
  termCode: string;
  name: string;
  description: string;
  items: (CourseSectionCalendarEvent | OtherCalendarEvent)[];
}

interface CourseSectionCalendarEvent extends CalendarEvent {
  type: "course-section";
  course: Course;
  section: Section;
}

interface OtherCalendarEvent extends CalendarEvent {
  type: "other";
}
