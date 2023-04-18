"use client";

import { useSubjects } from "@/hooks/fetching/use-subjects";
import { ChangeEvent, useState } from "react";
import { getSearchGroups } from "./search-bar-logic";

interface CourseSearchBarProps { }

export function CourseSearchBar({ }: CourseSearchBarProps) {
  const { subjects, isLoading } = useSubjects();
  const [text, setText] = useState("");


  const onKey = (e: ChangeEvent<HTMLInputElement>) => {
    const subjectCodes = subjects!.map(subject => subject.code)
    const query = e.currentTarget.value
    const {value, searchGroups} = getSearchGroups({query, subjectCodes})
    console.log(value)
    console.log(searchGroups)

    setText(value)
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
