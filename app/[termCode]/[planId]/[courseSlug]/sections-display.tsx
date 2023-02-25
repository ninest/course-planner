import { getSectionsForCourse } from "@/api/sections";
import { stringTimeToTime } from "@/utils/course/course";
import clsx from "clsx";
import { DayTable } from "./DayTable";

interface SectionsDisplayProps {
  termCode: string;
  subjectCode: string;
  courseNumber: string;
}

export const SectionsDisplay = async ({
  termCode,
  subjectCode,
  courseNumber,
}: SectionsDisplayProps) => {
  const sections = await getSectionsForCourse(
    termCode,
    subjectCode,
    courseNumber
  );

  return (
    <div>
      <h3 className="font-bold mb-1">Sections</h3>
      <div>
        {sections.map((section) => {
          if (!section)
            return <div>Failed to fetch section. Try reloading</div>;

          const professorsAvailable =
            section?.faculty && section.faculty.length > 0;
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
          if (showCampus)
            location = `${location}, ${section.campus.description}</>`;

          const showWaitlist =
            section?.seats.waitlist.available !== 0 &&
            section?.seats.waitlist.capacity !== 0;

          return (
            <div className="bg-gray-50 p-2 rounded">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  {professorsAvailable ? (
                    professors
                  ) : (
                    <i>Professors to be announced</i>
                  )}
                </div>
                <div className="font-mono text-xs">{section.crn}</div>
              </div>

              <div className="mt-1.5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {section.days && <DayTable days={section.days} />}
                  {showTime && (
                    <div className="font-mono text-xs">
                      {stringTimeToTime(section.startTime)}-
                      {stringTimeToTime(section.endTime)}
                    </div>
                  )}
                </div>
                <div className="text-xs">{location}</div>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex space-x-base">
                  <div className="text-sm flex items-center space-x-1 font-mono font-bold">
                    <span
                      className={clsx({
                        "text-yellow-600":
                          section.seats.available >= 5 &&
                          section.seats.available < 10,
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
        })}
      </div>
    </div>
  );
};
