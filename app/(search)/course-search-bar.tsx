"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import { useSearchBar } from "./hooks/use-search-bar";

interface CourseSearchBarProps {}

export function CourseSearchBar({}: CourseSearchBarProps) {
  const { setCourseSearchQuery, value, doSearch } = useSearchBar();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    // setCourseSearchQuery(query);
    console.log(query)
  };

  const onKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key==="Enter") {
      doSearch()
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search courses, CRNs, ..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="form-field"
      />
    </>
  );
}
