import { getCourse } from "@/api/courses";
import { useQuery } from "@tanstack/react-query";

export function useCourse(subjectCode: string, courseNumber: string) {
  const { isLoading, isError, isSuccess, data } = useQuery(["course", subjectCode, courseNumber], () =>
    getCourse(subjectCode, courseNumber)
  );

  return { isCourseLoading: isLoading, isError, isSuccess, course: data };
}
