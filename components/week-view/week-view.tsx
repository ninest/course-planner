import { WEEK_DAYS } from "@/utils/date/display";
import { eventColorsMap } from "@/utils/event/colors";
import { getConflictList } from "@/utils/event/conflict";
import { CalendarEvent } from "@/utils/event/types";
import { integerRange, integersBetween } from "@/utils/list";
import { hourToCalendarDisplay } from "@/utils/time/display";
import clsx from "clsx";

interface WeekViewProps {
  events: CalendarEvent[];
}

export const WeekView = ({ events }: WeekViewProps) => {
  const minHour = Math.min(9, ...events.map((event) => event.startTime.hour));
  const maxHour = Math.max(...events.map((event) => event.endTime.hour), 17);
  const hours = integersBetween(minHour, maxHour);

  const conflicts = getConflictList(events);

  return (
    <>
      {/* Days */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "4.5rem repeat(5, minmax(0, 1fr))",
        }}
      >
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
      <div
        className="grid"
        style={{
          gridTemplateColumns: "4.5rem repeat(5, minmax(0, 1fr))",
          gridAutoRows: "0.45rem",
        }}
      >
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
            className="text-right pr-2 tabular-nums text-xs font-medium text-gray-500 pt-1"
          >
            {hourToCalendarDisplay(hour)}
          </div>
        ))}

        {/* Events */}
        {events.map((event, index) => {
          const durationMinutes =
            event.endTime.hour * 60 +
            event.endTime.minute -
            (event.startTime.hour * 60 + event.startTime.minute);

          const startRowSpan =
            1 +
            (event.startTime.hour - minHour) * 12 +
            event.startTime.minute / 5;

          const rowSpan = durationMinutes / 5;

          // Get conflict and change style
          const conflictingEvents = conflicts.get(event) ?? [];
          const eventIsConflicting = conflictingEvents.length > 0;

          const eventColor = event.color ?? eventColorsMap.GRAY;

          return (
            <div
              key={index}
              style={{
                gridColumn: event.day + 1,
                gridRow: `${startRowSpan} / span ${rowSpan} `,
              }}
              className="my-[0.1rem] mx-[0.05rem]"
            >
              <div
                className={clsx(
                  eventColor.className,
                  "w-full h-full rounded-lg p-2 text-xs border-2",
                  {
                    "border-transparent": !eventIsConflicting,
                    "border-red-300": eventIsConflicting,
                  },
                  "overflow-scroll"
                )}
              >
                <div className="font-semibold">{event.title}</div>
                <div>{event.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
