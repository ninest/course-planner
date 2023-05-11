"use client";

import { CourseSearchBar } from "@/app/(search)/course-search-bar";
import { SearchResults } from "@/app/(search)/search-results";
import { TransparentHeader } from "@/components/sticky-transparent-header";
import { useTerm } from "@/hooks/fetching/use-terms";
import { courseToSlug2 } from "@/course";
import { useSearchParams } from "next/navigation";

interface TermLayoutProps {
  params: { termCode: string; planId: string };
}

export default function PlanPageSidebar({ params }: TermLayoutProps) {
  const { term } = useTerm(params.termCode);
  const searchParams = useSearchParams();

  return (
    <div>
      {/* Mobile: increase top so it doesn't cover the chevron */}
      <TransparentHeader className="sticky top-[var(--bottom-sheet-handle-container-height)] px-3 pb-3 md:top-0 md:p-3">
        <CourseSearchBar allowSelectTerm={false} />
      </TransparentHeader>
      <div className="px-3 mb-40">
        <SearchResults
          term={term}
          courseHrefFn={(course) =>
            `/plan/${params.termCode}/${params.planId}/${courseToSlug2(course)}?${searchParams}`
          }
        />
      </div>
    </div>
  );
}
