"use client";

import { useState } from "react";
import { CourseSearchBar } from "./course-search-bar";
import { useSearchBar } from "./hooks/use-search-bar";

export default function SearchPage() {
  const {searchGroups} = useSearchBar()
  return (
    <h1>
      Search page
      <div>
        <CourseSearchBar  />
      </div>
      <div>
        {JSON.stringify(searchGroups,null,2)}
      </div>
    </h1>
  );
}
