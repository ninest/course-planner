import { Course, SearchGroup } from "@/.data/types";
import { searchCourses } from "@/api/search";
import { useSubjects } from "@/hooks/fetching/use-subjects";
import { decodeSearchQuery } from "@/utils/string";
import { atom, useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getSearchGroups } from "../../../utils/course/search";

const courseSearchQueryAtom = atom("");
const searchGroupsAtom = atom<SearchGroup[]>([]);
const termAtom = atom<string>("all");
const searchResultsAtom = atom<Course[]>([]);

export function useSearchBar() {
  const params = useSearchParams();
  const initialEncodedSearchQuery = params.get("search") ?? "";

  const [courseSearchQuery, setCourseSearchQuery] = useAtom(courseSearchQueryAtom);
  const [searchGroups, setSearchGroups] = useAtom(searchGroupsAtom);
  const [term, setTerm] = useAtom(termAtom);
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);

  useEffect(() => {
    const searchQuery = decodeSearchQuery(initialEncodedSearchQuery);
    setCourseSearchQuery(searchQuery);
  }, [initialEncodedSearchQuery]);

  const doSearch = (searchQuery: string) => {
    const sg = getSearchGroups({ query: searchQuery });
    setSearchGroups(sg);

    // Remember: setState is async!
    searchCourses(sg).then((courses) => {
      setSearchResults(courses);
    });
  };

  return {
    courseSearchQuery,
    setCourseSearchQuery,
    searchGroups,
    doSearch,
    searchResults,
    term,
    setTerm,
  };
}
