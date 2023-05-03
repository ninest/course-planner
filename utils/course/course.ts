import { Course, MinimizedCourse } from "@/.data/types";

export const courseToSlug = (courseSubjectNumber: string) => {
  return courseSubjectNumber.toUpperCase().replace(" ", "-");
};

export const courseToSlug2 = (course: MinimizedCourse) => `${course.subject}${course.number}`;

export const slugToCourse = (slug: string) => {
  const subject = slug.split("-")[0].toUpperCase();
  const number = slug.split("-")[1];
  return { subject, number };
};

export const slugToCourse2 = (slug: string): MinimizedCourse => {
  const lettersThenNumbersRe = /^([A-Za-z]{2,5})\s?(\d+)$/;
  const courseMatch = slug.match(lettersThenNumbersRe);
  if (!courseMatch) throw new Error(`Not a course slug: ${slug}`);

  const subjectCode = courseMatch[1].toUpperCase();
  const courseNumber = courseMatch[2];

  return { subject: subjectCode, number: courseNumber };
};

export const courseDescriptionToList = (description: string) => {
  // https://stackoverflow.com/a/18914855/8677167
  return description.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
};

export const courseShortTitle = (course: Course) => `${course.subject} ${course.number}`;
