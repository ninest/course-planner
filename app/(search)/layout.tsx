"use client";

import { courseToSlug2 } from "@/utils/course/course";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { CourseSearchBar } from "./course-search-bar";
import { useUrlCourse } from "./hooks/use-search-url-course";

import { SearchResults } from "./search-results";

export default function SearchLayout({ children }: { children: ReactNode }) {
  // TODO: make this a server component, get pathname somehow https://stackoverflow.com/questions/75362636/how-can-i-get-the-url-pathname-on-a-server-component-next-js-13
  const pathname = usePathname();
  const showingCourses = pathname !== "/";

  const selectedCourses = useUrlCourse() ?? [];
  const params = useSearchParams();

  return (
    <main>
      {/* Mobile */}
      <div className="md:hidden">
        {showingCourses ? (
          <>{children}</>
        ) : (
          <>
            <div className="bg-white/90 backdrop-blur-sm p-5 sticky top-0 z-50">
              <CourseSearchBar />
            </div>
            <SearchResults
              selectedCourses={selectedCourses}
              courseHrefFn={(course) => `/${courseToSlug2(course)}?${params}`}
              className="px-5 mb-40"
            />
          </>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex md:h-screen">
        <div className="md:w-[300px] lg:w-[400px] md:overflow-y-scroll md:border-r">
          <div className="bg-white/90 z-10 backdrop-blur-sm p-5 sticky top-0">
            <CourseSearchBar />
          </div>
          <SearchResults
            selectedCourses={selectedCourses}
            courseHrefFn={(course) => `/${courseToSlug2(course)}?${params}`}
            className="px-5 mb-40"
          />
        </div>
        <div className="flex-1 h-screen overflow-y-scroll">{children}</div>
      </div>
    </main>
  );
}
