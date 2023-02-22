import { getTermCourses } from "@/services/term-courses";
import { useQuery } from "@tanstack/react-query";

export const useTermCourses = (termCode: string) => {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ["mapping", "term-courses", termCode],
    () => getTermCourses(termCode)
  );

  return { isLoading, isError, isSuccess, termCoursesMapping: data };
};
