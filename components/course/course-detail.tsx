import { Course } from "@/.data/types";
import { HTMLAttributes } from "react";

interface CourseDetailProps extends HTMLAttributes<HTMLDivElement> {
  termCode?: string;
  course: Course;
}

export function CourseDetail({ termCode, course, className }: CourseDetailProps) {
  const showSectionCount = termCode !== "all";
  const numSections = course.sections.filter((section) => section.term === termCode).length;

  const sectionsDisplay = numSections === 0 ? "No sections" : `${numSections} section${numSections > 1 ? "s" : ""}`;

  return (
    <div className={className}>
      {/* Course name */}
      <div className="text-sm truncate">
        <span className="font-bold tabular-nums">
          {course.subject} {course.number}
        </span>
        <span> {course.title}</span>
      </div>

      {/* Num sections */}
      {showSectionCount && <div className="mt-0.5 text-xs text-gray-600">{sectionsDisplay}</div>}
    </div>
  );
}
