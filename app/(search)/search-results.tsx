"use client";

import { useUrlCourse } from "@/app/(search)/hooks/use-search-url-course";
import { CourseDetailList } from "@/components/course/course-detail-list";
import { useSubjectCodes } from "@/hooks/fetching/use-subjects";
import { useTerms } from "@/hooks/fetching/use-terms";
import { courseToSlug2 } from "@/utils/course/course";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useSearch } from "./hooks/use-search";

interface SearchResultsProps {
  // courses: Course[]
}

export function SearchResults({}: SearchResultsProps) {
  const { subjectCodes } = useSubjectCodes();
  const { searchGroups, searchResults, searchIsLoading, term } = useSearch({ subjectCodes });
  const { terms } = useTerms();

  const selectedTerm = terms?.find((t) => t.code === term);

  const params = useSearchParams();
  const courses = useUrlCourse();

  // const isLoading = sea

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
                    {group.type === "subject-query" && (
                      <div key={index}>
                        {group.subjectCode} "{group.query}"
                      </div>
                    )}
                    {group.type === "number" && <div key={index}>{group.courseNumber} courses</div>}
                    {group.type === "query" && <div key={index}>"{group.query}"</div>}
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
          <section className={clsx("mt-3")}>
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
