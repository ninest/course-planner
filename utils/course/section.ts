import { Course } from "@/.data/types";

export function hasSectionInTerm(course: Course, termCode: string) {
  return course.sections.map((section) => section.term).includes(termCode);
}
