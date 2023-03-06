import { Course, Section } from "@/.data/types";
import {
  getSectionLocation,
  getSectionProfessors,
} from "@/utils/section/section";
import clsx from "clsx";
import { HTMLAttributes } from "react";

interface SectionItemProps extends HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
  isConflicting?: boolean;
  course: Course;
  section: Section;
}

export const SectionItem = ({
  highlighted = false,
  isConflicting = false,
  course,
  section,
  ...props
}: SectionItemProps) => {
  const professorsAvailable = section.faculty && section.faculty.length > 0;
  const professors = getSectionProfessors(section);
  const showSectionTime = section?.startTime && section?.endTime;
  // Only show campus if not Boston
  const showSectionCampus = section?.campus.description
    ? section?.campus.description !== "Boston"
    : false;
  let location = getSectionLocation(section);
  if (showSectionCampus)
    location = `${location}, ${section.campus.description}`;
  const showSectionWaitlist =
    section?.seats.waitlist.available !== 0 &&
    section.seats.waitlist.capacity !== 0;

  return (
    <div
      id={section.crn}
      className={clsx(
        "bg-gray-100 p-3 rounded-md hover:bg-indigo-50 border-2",
        { "border-transparent": !highlighted, "border-indigo-600": highlighted }
      )}
      {...props}
    >
      {/* Top row: professors and CRN */}
    </div>
  );
};
