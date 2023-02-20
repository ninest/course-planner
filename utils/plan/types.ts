import type { Course } from "../../.data/types";

export interface CoursePlan {
  termCode: string;
  name: string;
  description?: string;
  courses: Course[];
}
