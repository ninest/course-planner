import { WEEK_DAYS } from "@/utils/date/display";
import { eventColorsMap } from "@/event/colors";
import { getConflictList } from "@/event/conflict";
import { CalendarEvent } from "@/event/types";
import { integerRange, integersBetween } from "@/utils/list";
import { hourToCalendarDisplay } from "@/utils/time/display";
import clsx from "clsx";

interface WeekViewProps {
  events: CalendarEvent[];
  hrefFn: (calendarEvent: CalendarEvent) => string;
}

export const WeekView = ({ events, hrefFn }: WeekViewProps) => {
  const minHour = Math.min(8, ...events.map((event) => event.startTime.hour));
  const maxHour = Math.max(...events.map((event) => event.endTime.hour), 17);
  const hours = integersBetween(minHour, maxHour);

  const conflicts = getConflictList(events);

  return (
    <>
      {/* Days */}
      <div className="grid grid-cols-week-view-mobile md:grid-cols-week-view">
        {WEEK_DAYS.map((day, index) => (
          <div
            key={index}
            style={{ gridColumn: index + 2 }}
            className="text-center text-xs text-gray-500 font-medium uppercase pb-2"
          >
            {day.shortName}
          </div>
        ))}
      </div>

      {/* Times and events */}
      <div className="grid grid-cols-week-view-mobile md:grid-cols-week-view auto-rows-[0.35rem] md:auto-rows-[0.4rem]">
        {/* Alternate table row colors */}
        {integerRange(hours.length)
          .filter((i) => i % 2 == 0)
          .map((i) => (
            <div
              key={i}
              style={{
                gridRow: `${12 * i + 1} / span 12`,
                gridColumn: "2 / span 8",
              }}
              className="bg-gray-50 rounded"
            />
          ))}

        {/* Times */}
        {hours.map((hour, index) => (
          <div
            key={index}
            style={{ gridColumn: 1, gridRow: `${index * 12 + 1} / span 12` }}
            className="pr-2 tabular-nums text-[0.6rem] md:text-xs font-medium text-gray-500 pt-1"
          >
            <div className="whitespace-nowrap -rotate-90 mt-9 pb-1 origin-right md:rotate-0 md:mt-0 md:pb-0">
              {hourToCalendarDisplay(hour)}
            </div>
          </div>
        ))}

        {/* Events */}
        {events.map((event, index) => {
          const durationMinutes =
            event.endTime.hour * 60 + event.endTime.minute - (event.startTime.hour * 60 + event.startTime.minute);
          const startRowSpan = 1 + (event.startTime.hour - minHour) * 12 + event.startTime.minute / 5;
          const rowSpan = durationMinutes / 5;

          // Get conflict and change style
          const conflictingEvents = conflicts.get(event) ?? [];
          const eventIsConflicting = conflictingEvents.length > 0;

          const eventColor = event.color ?? "GRAY";
          const eventColorClassName = eventColorsMap[eventColor].className;

          // const hrefToCourse = `/`;
          const href = hrefFn(event);

          return (
            <div
              key={index}
              style={{
                gridColumn: event.day + 1,
                gridRow: `${startRowSpan} / span ${rowSpan} `,
              }}
              className="my-[0.1rem] mx-[0.05rem]"
            >
              <a
                href={href}
                className={clsx(
                  eventColorClassName,
                  "block w-full h-full rounded-lg p-1 md:p-2 border-2",
                  {
                    "border-transparent": !eventIsConflicting,
                    "border-red-300 opacity-60": eventIsConflicting,
                    "opacity-60 animate-jiggle": event.possible,
                  },
                  "overflow-scroll"
                )}
              >
                <div className="text-xs font-semibold">{event.title}</div>
                <div className="text-[0.6rem] md:text-xs">{event.subtitle}</div>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};
