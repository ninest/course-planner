"use client";

import { CourseSearchBar } from "./course-search-bar";
import { useSearchBar } from "./hooks/use-search-bar";

export default function SearchPage() {
  const {searchGroups} = useSearchBar()
  return (
    <div>
      {JSON.stringify(searchGroups,null,2)}
    </div>
  );
}
