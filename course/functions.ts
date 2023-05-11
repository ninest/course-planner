import { Course, Section } from "@/.data/types";

export const courseContainsSection = (
  course: Course,
  section: Section
): boolean => {
  return !!course.sections.find(
    (sectionItem) => sectionItem.crn === section.crn
  );
};
