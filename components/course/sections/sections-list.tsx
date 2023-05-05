"use client";

import { Course, MinimizedCourse } from "@/.data/types";
import { Empty } from "@/components/Empty";
import { useSections } from "@/hooks/fetching/use-sections";
import { removeDuplicates } from "@/utils/list";
import clsx from "clsx";
import { ComponentProps } from "react";
import { SectionItem } from "./section-item";

interface SectionListProps extends ComponentProps<"div"> {
  termCode: string;
  course: Course;
}

export function SectionList({ termCode, course, className }: SectionListProps) {
  const { isLoading, sections } = useSections(termCode, course.subject, course.number);

  // Get list of CRNs to display loading state
  const crns = removeDuplicates(
    course.sections.filter((section) => section.term === termCode).map((section) => section.crn)
  );

  return (
    <div className={clsx(className, "space-y-2")}>
      {crns.map((crn) => {
        return <SectionItem key={crn} termCode={termCode} course={course} crn={crn} />;
      })}
      {/* {isLoading && !sections && (
        <>
          {crns.map((crn) => {
            return (
              <Empty key={crn} className="flex items-center justify-center font-medium h-36">
                Loading CRN {crn} ...
              </Empty>
            );
          })}
        </>
      )} */}

      {/* {sections && (
        <>
          {sections.map((section, index) => {
            if (section) return <SectionItem key={index} course={course} section={section} />;
            else
              <Empty key={index} className="flex items-center justify-center font-medium h-36">
                Error?
              </Empty>;
          })}
        </>
      )} */}
    </div>
  );
}
