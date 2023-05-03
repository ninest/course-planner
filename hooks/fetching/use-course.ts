import { Course, MinimizedCourse } from "@/.data/types";
import { getCourse } from "@/api/courses";
import { useQueries, useQuery } from "@tanstack/react-query";

export function useCourse(course: MinimizedCourse) {
  const { isLoading, isError, isSuccess, data } = useQuery(["course", course.subject, course.number], () =>
    getCourse(course.subject, course.number)
  );

  return { isCourseLoading: isLoading, isError, isSuccess, course: data };
}

export function useCourses(courses: MinimizedCourse[]) {
  const results = useQueries({
    queries: courses.map((course) => ({
      queryKey: ["course", course.subject, course.number],
      queryFn: () => getCourse(course.subject, course.number),
    })),
  });

  return results;
}
