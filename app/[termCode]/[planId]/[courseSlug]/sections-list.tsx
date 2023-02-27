"use client";

import { Course } from "@/.data/types";
import { useSections } from "@/hooks/fetching/use-sections";
import { SectionItem } from "./section-item";

interface SectionsListProps {
  termCode: string;
  course: Course;
}

export const SectionsList = ({ termCode, course }: SectionsListProps) => {
  const { isLoading, sections } = useSections(
    termCode,
    course.subject,
    course.number
  );

  return (
    <div>
      <h3 className="font-bold mb-1">Sections</h3>
      <div className="space-y-2 -mx-1">
        {isLoading && (
          <div className="text-center font-semibold text-gray-600">
            Loading sections ...
          </div>
        )}
        {sections?.map((section, index) => {
          if (!section)
            return (
              <div key={index}>Failed to fetch section. Try reloading</div>
            );

          return <SectionItem key={index} course={course} section={section} />;
        })}
      </div>
    </div>
  );
};
