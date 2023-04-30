"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { CourseSearchBar } from "./course-search-bar";

import { SearchResults } from "./search-results";

export default function SearchLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showingCourses = pathname !== "/";

  return (
    <main>
      {/* Mobile */}
      <div className="md:hidden">
        <div className="p-5">
          <CourseSearchBar />
        </div>
        {showingCourses ? <>{children}</> : <SearchResults />}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex md:h-screen">
        <div className="md:w-[300px] lg:w-[400px] md:overflow-y-scroll md:border-r">
          <div className="bg-white/90 backdrop-blur-sm p-5 sticky top-0">
            <CourseSearchBar />
          </div>
          <SearchResults />
        </div>
        <div className="flex-1 h-screen overflow-y-scroll">{children}</div>
      </div>
    </main>
  );
}
