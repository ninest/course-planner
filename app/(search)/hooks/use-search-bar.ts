
import { atom, useAtom } from "jotai";
import { useSubjects } from "@/hooks/fetching/use-subjects";
import { getSearchGroups } from "../search-bar-logic";
import { useQuery } from "@tanstack/react-query";
import { searchCourses } from "@/api/search"
import { Course } from "@/.data/types"

// const courseSearchQueryAtom = atom("")
const searchResultsAtom = atom<Course[]>([])

export function useSearchBar() {
  const { subjects, isLoading } = useSubjects();
  // const [courseSearchQuery, setCourseSearchQuery] = useAtom(courseSearchQueryAtom)
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom)

  const subjectCodes =( subjects??[]).map(subject => subject.code)
  // const {value, searchGroups} = getSearchGroups({query:courseSearchQuery, subjectCodes})

  const doSearch = async () => {
    const courses = await searchCourses(searchGroups);
    setSearchResults(courses)
  }

  return {
    courseSearchQuery, setCourseSearchQuery,
    value, searchGroups,
    doSearch
  }
}