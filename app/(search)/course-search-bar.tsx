"use client";

import { useState } from "react";

interface CourseSearchBarProps {}

export function CourseSearchBar({}: CourseSearchBarProps) {
  const [text, setText] = useState("");
  return (
    <input
      type="text"
      placeholder="Search courses, CRNs, ..."
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
    />
  );
}
