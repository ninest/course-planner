"use client";

import { Course, Section } from "@/.data/types";
import { Button } from "@/components/button";
import { usePlans } from "@/hooks/use-plans";
import { useWeekView } from "@/hooks/use-week-view";
import { dayToNumber } from "@/utils/date/days";
import { CalendarEvent } from "@/utils/event/types";
import { useCurrentPlanId } from "@/utils/route";
import { sectionLocation } from "@/utils/section/section";
import { stringTimeToDisplayTime, stringTimeToTime } from "@/utils/time/time";
import clsx from "clsx";
import { DayTable } from "../../../../components/course/day-table";

interface SectionItemProps {
  highlighted?: boolean;
  course: Course;
  section: Section;
}

export const SectionItem = ({
  highlighted = false,
  course,
  section,
}: SectionItemProps) => {
  const professorsAvailable = section?.faculty && section.faculty.length > 0;
  const professors = section.faculty
    .map((professor) => professor.name)
    .join("; ");
  const showTime = section?.startTime && section.endTime;
  const showCampus = section?.campus?.description
    ? section?.campus.description !== "Boston"
    : false;
  let location = sectionLocation(section);
  if (showCampus) location = `${location}, ${section.campus.description}`;
  const showWaitlist =
    section?.seats.waitlist.available !== 0 &&
    section?.seats.waitlist.capacity !== 0;

  const calendarEvents: CalendarEvent[] = section.days.map((day) => ({
    id: section.crn,
    day: dayToNumber(day),
    startTime: stringTimeToTime(section.startTime),
    endTime: stringTimeToTime(section.endTime),
    title: `${course.subject} ${course.number}`,
    subtitle: sectionLocation(section),
  }));

  const planId = useCurrentPlanId();

  const { setPreviewEvents, addSectionToPreview, removeSectionsFromPreview } =
    useWeekView();
  const { addCourseToPlan, removeCourseFromPlan, sectionInPlan } = usePlans();

  const sectionAlreadyInCurrentPlan = sectionInPlan(planId!, section.crn);

  const onAddClick = () => {
    addCourseToPlan(planId!, course, section);
    // Clear preview after adding course to prevent "ghost" conflicts between preview event and newly added event
    clearPreview();
  };

  const onRemoveClick = () => {
    removeCourseFromPlan(planId!, section.crn);
  };

  const setPreview = (crn: string) => {
    if (sectionAlreadyInCurrentPlan) {
      addSectionToPreview(crn);
      return;
    }
    setPreviewEvents(calendarEvents);
  };
  const clearPreview = () => {
    setPreviewEvents([]);
    removeSectionsFromPreview();
  };

  return (
    <div
      id={section.crn}
      className={clsx(
        "@container",
        "bg-gray-50 p-3 rounded-md hover:bg-indigo-50 border-2",
        {
          "border-transparent": !highlighted,
          "border-indigo-600": highlighted,
        }
      )}
      onMouseEnter={() => setPreview(section.crn)}
      onMouseLeave={clearPreview}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm">
          {professorsAvailable ? professors : <i>Professors to be announced</i>}
        </div>
        <div className="font-mono text-xs">{section.crn}</div>
      </div>

      <div className="mt-1.5 flex flex-col @sm:flex-row @sm:items-center space-y-1.5 @sm:space-y-0 @sm:justify-between">
        <div className="flex items-center space-x-2">
          {section.days && <DayTable days={section.days} />}
          {showTime && (
            <div className="font-mono text-xs">
              {stringTimeToDisplayTime(section.startTime)}-
              {stringTimeToDisplayTime(section.endTime)}
            </div>
          )}
        </div>
        <div className="text-xs">{location}</div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex space-x-3">
          <div className="text-xs flex items-center space-x-1 font-mono font-bold">
            <span
              className={clsx({
                "text-yellow-600":
                  section.seats.available >= 5 && section.seats.available < 10,
                "text-red-600": section.seats.available < 5,
              })}
            >
              {section.seats.available}
            </span>
            <span>/</span>
            <span>{section.seats.total}</span>
          </div>

          {showWaitlist && (
            <div className="flex items-center space-x-1 text-xs">
              <span>{section.seats.waitlist.available}</span>
              <span>/</span>
              <span>{section.seats.waitlist.capacity}</span>
              <span>waitlist</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2">
        {sectionAlreadyInCurrentPlan ? (
          <Button onClick={onRemoveClick} size={"sm"}>
            Remove
          </Button>
        ) : (
          <Button onClick={onAddClick} size={"sm"}>
            Add
          </Button>
        )}
      </div>
    </div>
  );
};
