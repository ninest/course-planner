import { getSectionsForCourse } from "@/api/sections";
import { useQuery } from "@tanstack/react-query";

export const useSections = (
  termCode: string,
  subjectCode: string,
  courseNumber: string
) => {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ["sections", termCode, subjectCode, courseNumber],
    () => getSectionsForCourse(termCode, subjectCode, courseNumber)
  );

  return { isLoading, isError, isSuccess, sections: data };
};
