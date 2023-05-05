"use client";

import { CourseDetailList } from "@/components/course/course-detail-list";
import { useTerms } from "@/hooks/fetching/use-terms";
import { useUrlCourse } from "@/app/(search)/hooks/use-search-url-course";
import { courseToSlug2 } from "@/utils/course/course";
import { useSearchParams } from "next/navigation";
import { useSearchBar } from "./hooks/use-search-bar";

interface SearchResultsProps {
  // courses: Course[]
}

export function SearchResults({}: SearchResultsProps) {
  const { searchGroups, searchResults, term } = useSearchBar();
  const { terms } = useTerms();

  const selectedTerm = terms?.find((t) => t.code === term);

  const params = useSearchParams();
  const courses = useUrlCourse();

  return (
    <>
      <div className="px-5 mb-40">
        {/* Searching results for ... */}
        {searchGroups.length > 0 && (
          <section>
            <div className="text-sm text-gray-600 mb-2">Showing results for</div>
            <div className="flex flex-wrap">
              {searchGroups.map((group, index) => {
                return (
                  <div key={index} className="text-xs rounded bg-gray-100 py-0.5 px-1 mr-2 mb-2">
                    {group.type === "course" && (
                      <div>
                        {group.subjectCode} {group.courseNumber.padEnd(4, "X")}
                      </div>
                    )}
                    {group.type === "subject" && <div key={index}>{group.subjectCode} courses</div>}
                    {group.type === "crn" && <div key={index}>CRN {group.crn}</div>}
                  </div>
                );
              })}

              <div className="text-xs rounded bg-primary-50 py-0.5 px-1 mr-2 mb-2">
                {selectedTerm?.description ?? "All terms"}
              </div>
            </div>
          </section>
        )}
        {searchResults.length > 0 && (
          <section className="mt-3">
            <CourseDetailList
              termCode={selectedTerm?.code ?? "all"}
              courses={searchResults}
              selectedCourses={courses}
              courseHrefFn={(course) => `/${courseToSlug2(course)}?${params}`}
            />
          </section>
        )}
      </div>
    </>
  );
}
