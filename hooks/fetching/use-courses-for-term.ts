import { getCoursesForTerm } from "@/api/courses";
import { useQuery } from "@tanstack/react-query";

export const useCoursesForTerm = (termCode: string, subjectCode: string) => {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ["courses-for-term", termCode,subjectCode],
    () => getCoursesForTerm(termCode, subjectCode),
    // Only fetch when subjectCode is valid
    { enabled: subjectCode.length >= 2 }
  );

  return { isLoading, isError, isSuccess, courses: data };
};
