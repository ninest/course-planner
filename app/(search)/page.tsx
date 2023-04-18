"use client";

import { useState } from "react";
import { CourseSearchBar } from "./course-search-bar";
import { SearchGroup } from "./search-bar-logic";

export default function SearchPage() {
  const [searchGroups, setSearchGroups] = useState<SearchGroup[] | null>(null);
  return (
    <h1>
      Search page
      <div>
        <CourseSearchBar setSearchGroups={setSearchGroups} />
      </div>
      <div>
        {JSON.stringify(searchGroups,null,2)}
      </div>
    </h1>
  );
}
