"use client";

import { useSubjects } from "@/hooks/fetching/use-subjects";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { getSearchGroups, SearchGroup } from "./search-bar-logic";

interface CourseSearchBarProps {
  setSearchGroups: Dispatch<SetStateAction<SearchGroup[]|null>>
}

export function CourseSearchBar({setSearchGroups }: CourseSearchBarProps) {
  const { subjects, isLoading } = useSubjects();
  const [text, setText] = useState("");


  const onKey = (e: ChangeEvent<HTMLInputElement>) => {
    const subjectCodes = subjects!.map(subject => subject.code)
    const query = e.currentTarget.value
    const {value, searchGroups} = getSearchGroups({query, subjectCodes})

    setText(value)
    setSearchGroups(searchGroups)
  }

  return (
    <>
      {subjects && (
        <input
          type="text"
          placeholder="Search courses, CRNs, ..."
          value={text}
          onChange={onKey}
        />
      )}
    </>
  );
}
