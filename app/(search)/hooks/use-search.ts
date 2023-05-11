import { Course, SearchGroup } from "@/.data/types";
import { searchCourses } from "@/api/search";
import { getSearchGroups } from "@/course/search";
import { atom, useAtom } from "jotai";
import { useGetSearchUrlParamValues } from "./use-search-url-param";

interface UseSearchParams {
  subjectCodes: string[];
}

const searchGroupsAtom = atom<SearchGroup[]>([]);
const searchResultsAtom = atom<Course[]>([]);
const searchIsLoadingAtom = atom<boolean>(false);

export function useSearch({ subjectCodes }: UseSearchParams) {
  const [searchGroups, setSearchGroups] = useAtom(searchGroupsAtom);
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);
  const { term } = useGetSearchUrlParamValues();
  const [searchIsLoading, setSearchIsLoading] = useAtom(searchIsLoadingAtom);

  const doSearch = async (searchQuery: string) => {
    setSearchIsLoading(true);
    const groups = getSearchGroups({ subjectCodes, query: searchQuery });
    setSearchGroups(groups);

    const searchResults = await searchCourses(groups);
    setSearchResults(searchResults);
    setSearchIsLoading(false);
  };

  return { searchGroups, searchResults, searchTermCode: term, searchIsLoading, doSearch };
}
