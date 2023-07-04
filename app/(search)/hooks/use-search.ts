import { Course, SearchGroup } from "@/.data/types";
import { searchCourses } from "@/api/search";
import { getSearchGroups } from "@/course/search";
import { atom, useAtom } from "jotai";
import { useGetSearchUrlParamValues } from "./use-search-url-param";
import { useSubjectCodes } from "@/hooks/fetching/use-subjects";
import { useTerms } from "@/hooks/fetching/use-terms";

interface UseSearchParams {
  subjectCodes: string[];
}

const searchGroupsAtom = atom<SearchGroup[]>([]);
const searchResultsAtom = atom<Course[]>([]);
const searchIsLoadingAtom = atom<boolean>(false);
const hasSearchResultsAtom = atom<boolean>(true);

export function useSearch({ subjectCodes }: UseSearchParams) {
  const [searchGroups, setSearchGroups] = useAtom(searchGroupsAtom);
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const { term } = useGetSearchUrlParamValues();

  // If search bar is loading and therefore disabled
  const { subjectCodesIsLoading } = useSubjectCodes();
  const { isTermsLoading } = useTerms();
  const searchBarIsLoading = subjectCodesIsLoading || isTermsLoading;

  // Searching is loading
  const [searchIsLoading, setSearchIsLoading] = useAtom(searchIsLoadingAtom);
  const [hasSearchResults, setHasSearchResults] = useAtom(hasSearchResultsAtom);

  const doSearch = async (searchQuery: string) => {
    setSearchIsLoading(true);

    const groups = getSearchGroups({ subjectCodes, query: searchQuery });
    setSearchGroups(groups);

    const searchResults = await searchCourses(groups);
    setSearchResults(searchResults);
    setSearchIsLoading(false);
    setHasSearchResults(searchResults.length > 0);
  };

  return {
    searchGroups,
    searchResults,
    searchTermCode: term,
    searchBarIsLoading,
    searchIsLoading,
    hasSearchResults,
    doSearch,
  };
}
