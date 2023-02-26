"use client";

import { Course, Section } from "@/.data/types";
import { useWeekView } from "@/hooks/use-week-view";
import { dayToNumber } from "@/utils/date/days";
import { CalendarEvent } from "@/utils/event/types";
import { stringTimeToDisplayTime, stringTimeToTime } from "@/utils/time/time";
import clsx from "clsx";
import { DayTable } from "./DayTable";

interface SectionItemProps {
  course: Course;
  section: Section;
}

export const SectionItem = ({ course, section }: SectionItemProps) => {
  const professorsAvailable = section?.faculty && section.faculty.length > 0;
  const professors = section.faculty
    .map((professor) => professor.name)
    .join("; ");
  const showTime = section?.startTime && section.endTime;
  const showCampus = section?.campus?.description
    ? section?.campus.description !== "Boston"
    : false;
  let location = section.online
    ? "Online"
    : `${section.building.description} ${section.building.room}`;
  if (showCampus) location = `${location}, ${section.campus.description}</>`;
  const showWaitlist =
    section?.seats.waitlist.available !== 0 &&
    section?.seats.waitlist.capacity !== 0;

  const calendarEvents: CalendarEvent[] = section.days.map((day) => ({
    day: dayToNumber(day),
    startTime: stringTimeToTime(section.startTime),
    endTime: stringTimeToTime(section.endTime),
    title: `${course.subject} ${course.number}`,
    subtitle: course.title,
  }));

  const { setPreviewEvents } = useWeekView();

  return (
    <div
      className="bg-gray-50 p-3 rounded-md hover:bg-indigo-50"
      onMouseEnter={() => setPreviewEvents(calendarEvents)}
      onMouseLeave={() => setPreviewEvents([])}
    >
      <div className="flex items-ce key={index}nter justify-between">
        <div className="text-sm">
          {professorsAvailable ? professors : <i>Professors to be announced</i>}
        </div>
        <div className="font-mono text-xs">{section.crn}</div>
      </div>

      <div className="mt-1.5 flex flex-col space-y-1.5">
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
          <div className="text-sm flex items-center space-x-1 font-mono font-bold">
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
    </div>
  );
};
