import { TIME_HOURS, WEEK_DAYS } from "@/utils/date/display";

export const WeekView = () => {
  return (
    <>
      <div
        className="grid"
        style={{ gridTemplateColumns: "3rem repeat(5, minmax(0, 1fr))" }}
      >
        {/* Alternate table row colors */}
        {[...new Array(10)].map((_, i) => (
          <div
            key={i}
            style={{
              gridRow: `${12 * (i + 0.5) * 2 + 3} / span 12`,
              gridColumn: "2 / span 8",
            }}
            className="bg-gray-50 rounded"
          />
        ))}
        {/* Days */}
        {WEEK_DAYS.map((day, index) => (
          <div
            key={index}
            style={{ gridColumn: index + 2 }}
            className="text-center"
          >
            {day.shortName}
          </div>
        ))}
        {/* Times */}
        {TIME_HOURS.map((hour, index) => (
          <div
            key={index}
            style={{ gridColumn: 1, gridRow: `${index * 12 + 2} / span 12` }}
            className="text-right pr-3 tabular-nums py-2"
          >
            {hour}
          </div>
        ))}
      </div>
    </>
  );
};
