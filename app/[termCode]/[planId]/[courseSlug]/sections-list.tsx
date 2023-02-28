"use client";

import { Course } from "@/.data/types";
import { Empty } from "@/components/Empty";
import { useSections } from "@/hooks/fetching/use-sections";
import clsx from "clsx";
import { useEffect, useState } from "react";
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

  const [crn, setCrn] = useState("");
  // This page may contain the CRN after the # in the URL
  // TODO: use a nextjs hook
  const setCrnFromHash = () => {
    console.log("setting");
    setCrn(window.location.hash?.split("#")[1]);
  };
  useEffect(() => {
    setCrnFromHash();
    window.addEventListener("hashchange", setCrnFromHash);
    return () => window.removeEventListener("hashchange", setCrnFromHash);
  }, []);

  return (
    <div>
      <h3 className="font-bold mb-1">Sections</h3>
      <div className="space-y-2 -mx-1">
        {isLoading && (
          <>
            {course.sections
              .filter((s) => s.term === termCode)
              .map((s) => {
                const highlighted = crn === s.crn;
                return (
                  <Empty
                    key={s.crn}
                    id={s.crn}
                    className={clsx(
                      "flex items-center justify-center font-medium h-36",
                      {
                        "border-2 border-indigo-600": highlighted,
                      }
                    )}
                  >
                    Loading CRN {s.crn} ...
                  </Empty>
                );
              })}
          </>
        )}
        {sections?.map((section, index) => {
          if (!section)
            return (
              <div key={index}>Failed to fetch section. Try reloading</div>
            );
          const highlighted = crn === section.crn;
          return (
            <SectionItem
              key={index}
              highlighted={highlighted}
              course={course}
              section={section}
            />
          );
        })}
      </div>
    </div>
  );
};
