import { CalendarEvent } from "@/types";
import { WEEK_DAYS } from "@/utils/date/display";
import { integerRange, integersBetween } from "@/utils/list";
import { hourToCalendarDisplay } from "@/utils/time/display";

interface WeekViewProps {
  events: CalendarEvent[];
}

export const WeekView = ({ events }: WeekViewProps) => {
  const minHour = Math.min(8, ...events.map((event) => event.startTime.hour));
  const maxHour = Math.max(...events.map((event) => event.endTime.hour), 16);
  const hours = integersBetween(minHour, maxHour);

  return (
    <>
      {/* Days */}
      <div
        className="grid mb-3"
        style={{
          gridTemplateColumns: "5rem repeat(5, minmax(0, 1fr))",
        }}
      >
        {WEEK_DAYS.map((day, index) => (
          <div
            key={index}
            style={{ gridColumn: index + 2 }}
            className="text-center text-gray-500 font-medium uppercase pb-3"
          >
            {day.shortName}
          </div>
        ))}
      </div>
      {/* Times and events */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "5rem repeat(5, minmax(0, 1fr))",
          gridAutoRows: "0.35rem",
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

          return (
            <div
              key={index}
              style={{
                gridColumn: event.day + 1,
                gridRow: `${startRowSpan} / span ${rowSpan} `,
              }}
              className="my-[0.1rem] mx-[0.05rem]"
            >
              <div className="w-full h-full rounded p-2  bg-indigo-50 text-xs ">
                {event.name}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
