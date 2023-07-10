import { Course, MinimizedCourse, Section } from "@/.data/types";

export const courseContainsSection = (course: Course, section: Section): boolean => {
  return !!course.sections.find((sectionItem) => sectionItem.crn === section.crn);
};

export function getCourseGoogleFormHref(course: Course) {
  return `https://docs.google.com/forms/d/e/1FAIpQLSdIzBLNUhuc1OMyPCPAKwDBo4gpvqcK78OY9yaoCoJ3YMxTkQ/viewform?usp=pp_url&entry.1345775324=${encodeURI(
    course.subject + " " + course.number
  )}&entry.1467381516=${encodeURI(course.title)}`;
}
