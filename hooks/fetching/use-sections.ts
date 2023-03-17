import { getMultipleSections, getSectionsForCourse } from "@/api/sections";
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

export const useMultipleSections = (termCode: string, crns: string[]) => {
  const { isLoading, isError, isSuccess, data } = useQuery(
    ["sections-multiple", termCode, crns],
    () => getMultipleSections(termCode, crns)
  );

  return { isLoading, isError, isSuccess, sections:data };
};
