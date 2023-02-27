import type { Course } from "../../.data/types";
import { CalendarEvent } from "../event/types";

export interface CoursePlan {
  id: string;
  termCode: string;
  name: string;
  description: string;
  events: CalendarEvent[];
}
