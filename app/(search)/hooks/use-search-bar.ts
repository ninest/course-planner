import { Course, SearchGroup } from "@/.data/types";
import { searchCourses } from "@/api/search";
import { useSubjects } from "@/hooks/fetching/use-subjects";
import { decodeSearchQuery } from "@/utils/string";
import { atom, useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getSearchGroups } from "../search-bar-logic";

const courseSearchQueryAtom = atom("");
const searchGroupsAtom = atom<SearchGroup[]>([]);
const searchResultsAtom = atom<Course[]>([]);

export function useSearchBar() {
  const params = useSearchParams();
  const initialEncodedSearchQuery = params.get("search") ?? "";

  const { subjects, isLoading } = useSubjects();
  const [courseSearchQuery, setCourseSearchQuery] = useAtom(courseSearchQueryAtom);
  const [searchGroups, setSearchGroups] = useAtom(searchGroupsAtom);
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);

  useEffect(() => {
    const searchQuery = decodeSearchQuery(initialEncodedSearchQuery);
    setCourseSearchQuery(searchQuery);
  }, [initialEncodedSearchQuery]);

  const subjectCodes = (subjects ?? []).map((subject) => subject.code);

  const doSearch = (searchQuery: string) => {
    const s = getSearchGroups({ query: searchQuery, subjectCodes });
    console.log(s);
    
    setCourseSearchQuery(s.value);
    setSearchGroups(s.searchGroups);

    // Remember: setState is async!
    searchCourses(s.searchGroups).then((courses)=>{
      console.log(courses);
      
    });

    return {
      formattedSearch: s.value,
    };
  };

  return {
    courseSearchQuery,
    setCourseSearchQuery,
    searchGroups,
    doSearch,
    searchResults,
  };
}
