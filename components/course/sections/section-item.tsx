import { Course, Section } from "@/.data/types";
import { Button, ButtonProps } from "@/components/button";
import { Empty } from "@/components/Empty";
import { useSection } from "@/hooks/fetching/use-sections";
import { getMeetingTimeLocation, getSectionProfessors } from "@/section/section";
import { stringTimeToDisplayTime } from "@/utils/time/time";
import clsx from "clsx";
import { ComponentProps } from "react";
import { DayTable } from "../day-table";

interface SectionItemProps extends ComponentProps<"div"> {
  termCode: string;
  course: Course;
  crn: string;
  onHover?: (section: Section, course: Course) => void;
  onUnhover?: (section: Section, course: Course) => void;
  // buttons?: { text: string; onClick: (section: Section, course: Course) => void }[];
  buttons?: (section: Section, course: Course) => ButtonProps[];
}

export function SectionItem({ termCode, course, crn, className, onHover, onUnhover, buttons }: SectionItemProps) {
  // Get hashes from URL
  const selectedCrns = window.location.hash.substring(1).split(",");

  const { isLoading, section } = useSection(termCode, crn);
  if (isLoading || !section)
    return (
      <Empty
        id={crn}
        key={crn}
        className={clsx("animate-pulse flex items-center justify-center font-medium h-36", {
          "border-primary-400": selectedCrns.includes(crn),
        })}
      >
        Loading CRN {crn} ...
      </Empty>
    );

  // Faculty should be same even if there are separate meeting times
  const faculty = section.meetingTimes[0].faculty;

  const professorsAvailable = faculty && faculty.length > 0;
  const professors = getSectionProfessors(section);

  const showSectionWaitlist =
    section?.seats.waitlist.available !== 0 &&
    section.seats.waitlist.capacity !== 0 &&
    // Dont show waitlist if empty
    section?.seats.waitlist.available !== section.seats.waitlist.capacity;

  return (
    <div
      id={crn}
      onMouseEnter={() => onHover?.(section, course)}
      onMouseLeave={() => onUnhover?.(section, course)}
      className={clsx(className, "bg-gray-100 p-3 rounded-md border-2 border-transparent dark:bg-gray-900", {
        "border-primary-400": selectedCrns.includes(crn),
      })}
    >
      <section className="flex items-center justify-between">
        {/* Professor */}
        <div className="text-sm">{professorsAvailable ? professors : <i>Professors to be announced</i>}</div>

        {/* CRN display */}
        <div className="font-mono text-xs">{crn}</div>
      </section>

      {/* Day/time */}
      <section className="mt-1.5 space-y-3 md:space-y-1">
        {section.meetingTimes.map((meetingTime, index) => {
          const showSectionTime = meetingTime?.startTime && meetingTime?.endTime;
          const location = getMeetingTimeLocation(meetingTime);
          return (
            <div key={index} className="flex flex-col space-y-0.5 md:flex-row md:space-y-0 md:justify-between">
              <div className="flex items-center space-x-2">
                {meetingTime.days.length > 0 ? (
                  <DayTable days={meetingTime.days} />
                ) : (
                  <span className="text-xs text-gray-600">Asynchronous</span>
                )}
                {showSectionTime && (
                  <div className="font-mono text-xs">
                    {stringTimeToDisplayTime(meetingTime.startTime)}-{stringTimeToDisplayTime(meetingTime.endTime)}
                  </div>
                )}
              </div>
              <div className="text-xs">{location} </div>
            </div>
          );
        })}
      </section>

      {/* Seats */}
      <div className="mt-3 flex items-baseline space-x-5">
        <div className="text-sm font-mono tabular-nums">
          <span
            className={clsx("font-bold", {
              "text-yellow-600": section.seats.available >= 5 && section.seats.available < 10,
              "text-red-600": section.seats.available < 5,
            })}
          >
            {section.seats.available}
          </span>{" "}
          / {section.seats.total}
        </div>

        {showSectionWaitlist && (
          <div className="text-gray-600 text-xs font-mono tabular-nums">
            {section.seats.waitlist.available} / {section.seats.waitlist.capacity} waitlist
          </div>
        )}
      </div>

      {/* Buttons, if any */}
      {buttons && (
        <div className="mt-3 flex items-center space-x-2">
          {buttons(section, course).map((button, index) => {
            return (
              <Button key={index} size={"sm"} {...button}>
                {button.children}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
