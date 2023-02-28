import { DayOfWeek, daysOfWeek } from "@/.data/types";
import { dayShortCodes } from "@/utils/date/days";
import clsx from "clsx";

interface DayTableProps {
  days: DayOfWeek[];
}

export const DayTable = ({ days }: DayTableProps) => {
  return (
    <div className="rounded-md inline-flex items-center border dark:border-gray-800 divide-x dark:divide-gray-800">
      {daysOfWeek.map((day, index) => {
        const highlighted = days.includes(day);
        return (
          <div key={index}>
            <div
              className={clsx("px-1.5 py-1 font-semibold text-xxs", {
                "rounded bg-gray-300 dark:bg-primary-darker text-gray-600 dark:text-primary-lighter":
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
