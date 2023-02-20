import type { Course } from "../../.data/types";

export interface CoursePlan {
  id: string;
  termCode: string;
  name: string;
  description: string;
  courses: Course[];
}
