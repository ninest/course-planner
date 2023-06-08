"use client";

import { Course } from "@/.data/types";
import { CourseInfo } from "@/components/course/course-info";
import { courseToSlug2 } from "@/course";
import { useSearchUrlParam } from "../hooks/use-search-url-param";

export function ClientCourseInfo({ course }: { course: Course }) {
  const searchUrlParams = useSearchUrlParam();

  return <CourseInfo course={course} courseHrefFn={(course) => `/${courseToSlug2(course)}?${searchUrlParams}`} />;
}
