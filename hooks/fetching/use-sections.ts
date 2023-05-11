import { getMultipleSections, getSection, getSectionsForCourse } from "@/api/sections";
import { QueryCache, QueryClient, useQueries, useQuery } from "@tanstack/react-query";

export const useSections = (termCode: string, subjectCode: string, courseNumber: string) => {
  const { isLoading, isError, isSuccess, data } = useQuery(["sections", termCode, subjectCode, courseNumber], () =>
    getSectionsForCourse(termCode, subjectCode, courseNumber)
  );

  return { isLoading, isError, isSuccess, sections: data };
};

export function useMultipleSections(sections: { termCode: string; crn: string }[]) {
  const results = useQueries({
    queries: sections.map((section) => ({
      queryKey: ["section", section.termCode, section.crn],
      queryFn: () => getSection(section.termCode, section.crn),
    })),
  });

  const fetchedSections = results.map((result) => result.data).filter(Boolean);
  const allLoaded = !results.some((result) => result.isLoading);
  const numSectionsWithSeats = fetchedSections.filter((section) => section?.seats.available ?? 0 > 0).length;

  return { results, fetchedSections, allLoaded, numSectionsWithSeats };
}

export function useSection(termCode: string, crn: string) {
  const { isLoading, isError, isSuccess, data } = useQuery(["section", termCode, crn], () => getSection(termCode, crn));
  return { isLoading, isError, isSuccess, section: data };
}

// Deprecate?
// export const useMultipleSections = (termCode: string, crns: string[]) => {
//   const { isLoading, isError, isSuccess, data } = useQuery(["sections-multiple", termCode, crns], () =>
//     getMultipleSections(termCode, crns)
//   );

//   return { isLoading, isError, isSuccess, sections: data };
// };
