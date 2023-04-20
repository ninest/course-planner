"use client";

import { Course } from "@/.data/types";
import { CourseDetailList } from "@/components/course-detail-list";
import { CourseDetail } from "@/components/course/course-detail";
import Link from "next/link";
import { useSearchBar } from "./hooks/use-search-bar";

interface SearchResultsProps {
  // courses: Course[]
}

export function SearchResults({}: SearchResultsProps) {
  const { searchGroups, searchResults } = useSearchBar();
  return (
    <>
      <div className="p-5">
        {searchGroups.length > 0 && (
          <section>
            <div className="text-sm text-gray-600 mb-2">Showing results for</div>
            <div className="flex flex-wrap">
              {searchGroups.map((group, index) => {
                return (
                  <div key={index} className="text-xs rounded bg-gray-100 py-0.5 px-1 mr-2 mb-2">
                    {group.type === "course" && (
                      <div>
                        {group.subjectCode} {group.courseNumber}
                      </div>
                    )}
                    {group.type === "subject" && <div key={index}>{group.subjectCode} courses</div>}
                    {group.type === "crn" && <div key={index}>CRN {group.crn} courses</div>}
                  </div>
                );
              })}
            </div>
          </section>
        )}
        {searchResults.length > 0 && (
          <section className="mt-3">
            <CourseDetailList courses={searchResults} />
          </section>
        )}
      </div>
    </>
  );
}
