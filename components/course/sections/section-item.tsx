import { Course, Section } from "@/.data/types";
import { Button } from "@/components/button";
import { usePlans } from "@/hooks/use-plans";
import { useWeekView } from "@/hooks/use-week-view";
import { dayToNumber } from "@/utils/date/days";
import { getConflictList } from "@/utils/event/conflict";
import { CalendarEvent } from "@/utils/event/types";
import { getPlanTimedEvents } from "@/utils/plan/functions";
import {
  getSectionLocation,
  getSectionProfessors,
} from "@/utils/section/section";
import { stringTimeToDisplayTime, stringTimeToTime } from "@/utils/time/time";
import clsx from "clsx";
import { HTMLAttributes } from "react";
import { DayTable } from "../day-table";

interface SectionItemProps extends HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
  isConflicting?: boolean;
  course: Course;
  section: Section;
  planId?: string;
}

export const SectionItem = ({
  highlighted = false,
  course,
  section,
  planId,
  ...props
}: SectionItemProps) => {
  // Faculty should be same even if there are separate meeting times
  const faculty = section.meetingTimes[0].faculty 

  const professorsAvailable = faculty && faculty.length > 0;
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

  // TODO: move this to another file
  // Events for this course for preview and checking if there are any conflicts
  const calendarEvents: CalendarEvent[] = section.days.map((day) => ({
    id: section.crn,
    day: dayToNumber(day),
    startTime: stringTimeToTime(section.startTime),
    endTime: stringTimeToTime(section.endTime),
    title: `${course.subject} ${course.number}`,
    subtitle: getSectionLocation(section),
  }));

  const { setPreviewEvents, addSectionToPreview, removeSectionsFromPreview } =
    useWeekView();
  const { planById, addCourseToPlan, removeCourseFromPlan, sectionInPlan } =
    usePlans();

  const plan = planById(planId!);

  const sectionAlreadyInCurrentPlan = sectionInPlan(planId!, section.crn);
  

  const onRemoveClick = () => {
    removeCourseFromPlan(planId!, section.crn);
  };
  const onAddClick = () => {
    addCourseToPlan(planId!, course, section);
    // Clear preview after adding course to prevent "ghost" conflicts between preview event and newly added event
    clearPreview();
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

  // If the section timing conflicts with any section already in the plan, show in red
  const eventsInCalendar = getPlanTimedEvents(plan!);

  const conflictMap = getConflictList([...calendarEvents, ...eventsInCalendar]);

  // A course should not ever be highlighted red if it conflicts with itself, so remove itself
  // from the list
  const conflictsWithCurrentSection = (
    calendarEvents?.map((event) => conflictMap.get(event)).flat() ?? []
  )
    // Remove current
    .filter((event) => event?.id !== section.crn);

  let isConflictingWithAny = conflictsWithCurrentSection.length > 0;

  return (
    <div
      id={section.crn}
      onMouseEnter={() => setPreview(section.crn)}
      onMouseLeave={clearPreview}
      className={clsx(
        "bg-gray-100 p-3 rounded-md hover:bg-primary-50 border-2",
        { "border-transparent": !highlighted, "border-primary-600": highlighted }
      )}
      {...props}
    >
      {/* Top row: professors and CRN */}
      <div className="flex items-center justify-between">
        <div className="text-sm">
          {professorsAvailable ? professors : <i>Professors to be announced</i>}
        </div>
        <div className="font-mono text-xs">{section.crn}</div>
      </div>

      {/* Row: days, time */}
      <div className="mt-1.5 flex flex-col @sm:flex-row @sm:items-center space-y-1.5 @sm:space-y-0 @sm:justify-between">
        <div className="flex items-center space-x-2">
          {section.days && <DayTable days={section.days} />}
          {showSectionTime && (
            <div
              className={clsx("font-mono text-xs", {
                "text-red-500": isConflictingWithAny,
              })}
            >
              {stringTimeToDisplayTime(section.startTime)}-
              {stringTimeToDisplayTime(section.endTime)}
            </div>
          )}
        </div>
        <div className="text-xs">{location}</div>
      </div>

      {/* Row: seats */}
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

          {showSectionWaitlist && (
            <div className="flex items-center space-x-1 text-xs">
              <span>{section.seats.waitlist.available}</span>
              <span>/</span>
              <span>{section.seats.waitlist.capacity}</span>
              <span>waitlist</span>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
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
