"use client";

import { Course, Section } from "@/.data/types";
import { Empty } from "@/components/Empty";
import clsx from "clsx";
import { SectionItem } from "./OLD_section-item";

export interface SectionsListProps {
  termCode: string;
  isLoading: boolean;
  courses: Course[];
  sections: (Section | null)[];
  planId?: string;
}

export const SectionsList = ({ termCode, isLoading = false, courses, sections, planId }: SectionsListProps) => {
  return (
    <div className="space-y-2">
      {isLoading
        ? sections
            // .filter((section) => section.term === termCode)
            // .slice()
            .map((section, index) => {
              return (
                <Empty
                  key={index}
                  className={clsx(
                    "flex items-center justify-center font-medium h-36"
                    // {
                    //   "border-2 border-primary-600": highlighted,
                    // }
                  )}
                >
                  Loading section ...
                </Empty>
              );
            })
        : sections.map((section) => {
            if (!section) return "Failed to load :/";
            const course = courses.find((course) =>
              course.sections.find((sectionInfo) => sectionInfo.crn === section.crn)
            )!;
            return <SectionItem key={section.crn} course={course} section={section} planId={planId} />;
          })}
    </div>
  );
};
