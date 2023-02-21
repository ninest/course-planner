import { MinimizedCourse } from "@/.data/types";

export const courseToSlug = (courseSubjectNumber: string) => {
  return courseSubjectNumber.toUpperCase().replace(" ", "-");
};

const slugToCourse = (slug: string) => {
  const subject = slug.split("-")[0].toUpperCase();
  const number = slug.split("-")[1];
  return { subject, number };
};
