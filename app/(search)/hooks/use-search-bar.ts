
import { atom, useAtom } from "jotai";
import { useSubjects } from "@/hooks/fetching/use-subjects";
import { getSearchGroups } from "../search-bar-logic";

const courseSearchQueryAtom = atom("")

export function useSearchBar() {
  const { subjects, isLoading } = useSubjects();
  const [courseSearchQuery, setCourseSearchQuery] = useAtom(courseSearchQueryAtom)

  const subjectCodes =( subjects??[]).map(subject => subject.code)
  const {value, searchGroups} = getSearchGroups({query:courseSearchQuery, subjectCodes})

  return {
    courseSearchQuery, setCourseSearchQuery,
    value, searchGroups
  }
}