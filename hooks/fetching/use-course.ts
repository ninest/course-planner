import { Course } from "@/.data/types";
import { getCourse } from "@/api/courses";
import { useQueries, useQuery } from "@tanstack/react-query";

export function useCourse(course: Pick<Course, "subject" | "number">) {
  const { isLoading, isError, isSuccess, data } = useQuery(["course", course.subject, course.number], () =>
    getCourse(course.subject, course.number)
  );

  return { isCourseLoading: isLoading, isError, isSuccess, course: data };
}

export function useCourses(courses: Pick<Course, "subject" | "number">[]) {
  const results = useQueries({
    queries: courses.map((course) => ({
      queryKey: ["course", course.subject, course.number],
      queryFn: () => getCourse(course.subject, course.number),
    })),
  });

  return results;
}
