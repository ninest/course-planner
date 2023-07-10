"use client";

import { MinimizedCourse, Term } from "@/.data/types";
import { Empty } from "@/components/Empty";
import { CourseDetailList } from "@/components/course/course-detail-list";
import { useSubjectCodes } from "@/hooks/fetching/use-subjects";
import { useTerms } from "@/hooks/fetching/use-terms";
import clsx from "clsx";
import { ComponentProps } from "react";
import { useSearch } from "./hooks/use-search";
import { SearchNotes } from "./search-notes";

interface SearchResultsProps extends ComponentProps<"div"> {
  selectedCourses?: MinimizedCourse[];
  term?: Term;
  // Function to get href of course when clicked
  courseHrefFn: ComponentProps<typeof CourseDetailList>["courseHrefFn"];
}

export function SearchResults({ selectedCourses, term, courseHrefFn, className }: SearchResultsProps) {
  const { subjectCodes } = useSubjectCodes();
  const { searchGroups, searchResults, searchBarIsLoading, searchIsLoading, searchTermCode, hasSearchResults } =
    useSearch({
      subjectCodes,
    });

  const { terms } = useTerms();
  const selectedTerm = term ? term : terms?.find((t) => t.code === searchTermCode);

  return (
    <>
      <div className={clsx(className, { "animate-pulse": searchIsLoading })}>
        {/* Searching results for ... */}
        {searchGroups.length > 0 && (
          <section>
            <div className="text-sm text-gray-600 mb-2">Showing results for</div>
            <div className="flex flex-wrap text-gray-800">
              {searchGroups.map((group, index) => {
                return (
                  <div
                    key={index}
                    className="text-xs rounded bg-gray-100 dark:bg-gray-900 dark:text-gray-500 py-0.5 px-1 mr-2 mb-2"
                  >
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

              <div className="text-xs rounded bg-primary-50 dark:bg-primary-950 dark:text-gray-500 py-0.5 px-1 mr-2 mb-2">
                {selectedTerm?.description ?? "All terms"}
              </div>
            </div>
          </section>
        )}

        <section className={clsx("mt-3")}>
          {/* Show if no results */}
          {!searchIsLoading && !hasSearchResults && (
            <Empty className="p-5 flex items-center justify-center mb-7">No search results</Empty>
          )}

          {/* Only show if not loading */}
          {!searchBarIsLoading && !searchIsLoading && (
            <>{searchResults.length === 0 && <SearchNotes searchNotesOpen={!hasSearchResults} />}</>
          )}

          <CourseDetailList
            termCode={selectedTerm?.code ?? "all"}
            courses={searchResults}
            selectedCourses={selectedCourses}
            courseHrefFn={courseHrefFn}
          />
        </section>
      </div>
    </>
  );
}
