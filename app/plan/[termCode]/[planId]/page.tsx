"use client";

import { CourseSearchBar } from "@/app/(search)/course-search-bar";
import { SearchResults } from "@/app/(search)/search-results";
import { courseToSlug2 } from "@/utils/course/course";
import { useSearchParams } from "next/navigation";

interface TermLayoutProps {
  params: { termCode: string; planId: string };
}

export default function PlanPageSidebar({ params }: TermLayoutProps) {
  const searchParams = useSearchParams();

  return (
    <div className="p-3">
      <CourseSearchBar allowSelectTerm={false} />
      <SearchResults
        courseHrefFn={(course) => `/plan/${params.termCode}/${params.planId}/${courseToSlug2(course)}?${searchParams}`}
        className="mt-4"
      />
    </div>
  );
}
