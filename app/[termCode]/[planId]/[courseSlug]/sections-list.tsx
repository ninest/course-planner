"use client";

import { Course } from "@/.data/types";
import { Empty } from "@/components/Empty";
import { useSections } from "@/hooks/fetching/use-sections";
import { usePlans } from "@/hooks/use-plans";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { SectionItem } from "./section-item";

interface SectionsListProps {
  termCode: string;
  course: Course;
  planId: string;
}

export const SectionsList = ({
  termCode,
  course,
  planId,
}: SectionsListProps) => {
  const { isLoading, sections } = useSections(
    termCode,
    course.subject,
    course.number
  );

  const [crn, setCrn] = useState("");
  // This page may contain the CRN after the # in the URL
  // TODO: use a nextjs hook
  const setCrnFromHash = () => {
    setCrn(window.location.hash?.split("#")[1]);
  };
  useEffect(() => {
    setCrnFromHash();
    window.addEventListener("popstate", setCrnFromHash);
    window.addEventListener("hashchange", setCrnFromHash);
    return () => {
      window.removeEventListener("popstate", setCrnFromHash);
      window.removeEventListener("hashchange", setCrnFromHash);
    };
  }, []);

  // If a planId is passed, show sections that are a part of the plan at the top
  const { planById, courseInPlan, sectionInPlan } = usePlans();
  const planContainsCourse = courseInPlan(
    planId,
    course.subject,
    course.number
  );

  return (
    <div className="space-y-5">
      {planContainsCourse && (
        <div>
          <h3 className="font-bold mb-1">My sections</h3>
          <div className="space-y-2 -mx-1">
            {isLoading && (
              <>
                {course.sections
                  .filter(
                    (s) => s.term === termCode && sectionInPlan(planId, s.crn)
                  )
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
            {sections
              ?.filter(
                (s) => s?.term === termCode && sectionInPlan(planId, s.crn)
              )
              .map((section, index) => {
                if (!section)
                  return (
                    <div key={index}>
                      Failed to fetch section. Try reloading
                    </div>
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
      )}

      <div>
        <h3 className="font-bold mb-1">All sections</h3>

        <div className="space-y-2 -mx-1">
          {isLoading && (
            <>
              {course.sections
                .filter((s) => s.term === termCode)
                .slice()
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
    </div>
  );
};
