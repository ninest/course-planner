"use client";

import { Course } from "@/.data/types";
import { Title } from "@/components/title";
import { useMultipleSections } from "@/hooks/fetching/use-sections";
import { getTermName } from "@/term";
import clsx from "clsx";
import { ComponentProps, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { SectionList } from "./sections-list";

interface SectionsProps extends ComponentProps<"div"> {
  termCode: string;
  course: Course;
  initiallyOpen?: boolean;
}

export function Sections({ termCode, course, className, initiallyOpen = false }: SectionsProps) {
  const termName = getTermName(termCode);

  const sections = course.sections
    .filter((section) => section.term === termCode)
    // Temp fix
    .map((section) => ({ ...section, termCode: section.term }));

  const { results, fetchedSections, allLoaded, numSectionsWithSeats } = useMultipleSections(sections);

  const [open, setOpen] = useState(initiallyOpen);

  return (
    <div className={clsx(className, "border rounded-md bg-white dark:bg-gray-950")}>
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer rounded-md p-3 sticky top-0 z-10  bg-inherit flex items-center justify-between"
      >
        <div className="flex flex-col">
          <Title level={4} className="font-medium">
            {termName}
          </Title>
          <div className="tabular-nums text-gray-600 dark:text-gray-500 text-sm">
            {sections.length} sections, {!allLoaded && "at least"} {numSectionsWithSeats} with seats
          </div>
        </div>
        <div className="flex space-x-2">
          {!allLoaded && (
            <div className="text-gray-400 animate-spin">
              <CgSpinner />
            </div>
          )}
          <div className={clsx({ "rotate-180": open })}>
            <FaCaretDown />
          </div>
        </div>
      </div>

      {open && <SectionList termCode={termCode} course={course} className="px-3 pb-3" />}
    </div>
  );
}
