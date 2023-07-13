import { DayOfWeek, daysOfWeek } from "@/.data/types";
import { dayShortCodes } from "@/utils/date/days";
import clsx from "clsx";

interface DayTableProps {
  days: DayOfWeek[];
}

export const DayTable = ({ days }: DayTableProps) => {
  // Show weekends only if required
  const containsWeekends = days.includes("sunday") || days.includes("saturday");
  const daysOfWeekList = containsWeekends ? daysOfWeek : daysOfWeek.slice(1, 6);
  return (
    <div className="rounded-md inline-flex items-center border dark:border-gray-800 divide-x dark:divide-gray-800">
      {daysOfWeekList.map((day, index) => {
        const highlighted = days.includes(day);
        return (
          <div key={index}>
            <div
              className={clsx("px-1.5 py-1 font-semibold text-xxs", {
                "rounded bg-gray-300 dark:bg-primary-900 text-gray-600 dark:text-primary-200":
                  highlighted,
              })}
            >
              {dayShortCodes[day]}
            </div>
          </div>
        );
      })}
    </div>
  );
};
