"use client";

import { CourseSearchBar } from "@/app/(search)/course-search-bar";
import { SearchResults } from "@/app/(search)/search-results";
import { TransparentHeader } from "@/components/sticky-transparent-header";
import { useTerm } from "@/hooks/fetching/use-terms";
import { courseToSlug2 } from "@/course";
import { useSearchParams } from "next/navigation";
import { useBottomSheet } from "./use-bottom-sheet";

interface TermLayoutProps {
  params: { termCode: string; planId: string };
}

export default function PlanPageSidebar({ params }: TermLayoutProps) {
  const { term } = useTerm(params.termCode);
  const searchParams = useSearchParams();
  const { bottomSheetExpanded } = useBottomSheet();

  return (
    <div>
      {/* Mobile: increase top so it doesn't cover the chevron */}
      <TransparentHeader className="sticky top-[var(--bottom-sheet-handle-container-height)] px-3 pb-3 md:top-0 md:p-3">
        {/* Only the mobile search bar can ever be disabled */}
        {/* Mobile */}
        <div className="md:hidden">
          <CourseSearchBar allowSelectTerm={false} disabled={!bottomSheetExpanded} />
        </div>
        {/* Desktop */}
        <div className="hidden md:block">
          <CourseSearchBar allowSelectTerm={false} />
        </div>
      </TransparentHeader>
      <div className="px-3 ">
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
