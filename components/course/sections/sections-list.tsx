"use client";

import { Course } from "@/.data/types";
import { useSections } from "@/hooks/fetching/use-sections";
import { removeDuplicates } from "@/utils/list";
import clsx from "clsx";
import { ComponentProps } from "react";
import { SectionItem } from "./section-item";

interface SectionListProps extends ComponentProps<"div"> {
  termCode: string;
  course: Course;
  onSectionHover?: ComponentProps<typeof SectionItem>["onHover"];
  onSectionUnhover?: ComponentProps<typeof SectionItem>["onUnhover"];
  sectionButtons?: ComponentProps<typeof SectionItem>["buttons"];
}

export function SectionList({
  termCode,
  course,
  className,
  onSectionHover,
  onSectionUnhover,
  sectionButtons,
}: SectionListProps) {
  // Get list of CRNs to display loading state
  const crns = removeDuplicates(
    course.sections.filter((section) => section.term === termCode).map((section) => section.crn)
  );

  return (
    <div className={clsx(className, "space-y-2")}>
      {crns.map((crn) => {
        return (
          <SectionItem
            key={crn}
            termCode={termCode}
            course={course}
            crn={crn}
            onHover={onSectionHover}
            onUnhover={onSectionUnhover}
            buttons={sectionButtons}
          />
        );
      })}
    </div>
  );
}
