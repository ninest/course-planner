"use client";

import { SearchGroup } from "@/.data/types";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useSearchBar } from "./hooks/use-search-bar";

interface CourseSearchBarProps {}

export function CourseSearchBar({}: CourseSearchBarProps) {
  // const [text, setText] = useState("");
  const { setCourseSearchQuery, value } = useSearchBar();

  const onKey = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    setCourseSearchQuery(query);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search courses, CRNs, ..."
        value={value}
        onChange={onKey}
        className="form-field"
      />
    </>
  );
}
