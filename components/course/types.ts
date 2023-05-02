import { Course } from "@/.data/types";

export type CourseHrefFn = (course: Pick<Course, "subject" | "number">) => string;
