// Component for course notes from notion

import { Expandable } from "@/components/expandable";
import { ComponentProps, ReactNode } from "react";

interface CourseNotesProps extends ComponentProps<"div"> {}

export function CourseNotes({ className, children }: CourseNotesProps) {
  return (
    <>
      <Expandable
        title="Course notes"
        details="Click to view links to syllabus, textbooks, and more"
        borderBetween
        className={className}
      >
        <div className="p-3">{children}</div>
      </Expandable>
    </>
  );
}
