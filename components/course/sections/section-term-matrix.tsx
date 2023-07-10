import { getTermYear, termCodes } from "@/term";
import { removeDuplicates } from "@/utils/list";
import clsx from "clsx";
import { ComponentProps, Fragment } from "react";

export interface SectionTermMatrixProps extends ComponentProps<"div"> {
  terms: string[];
}

export function SectionTermMatrix({ terms, className }: SectionTermMatrixProps) {
  const years = removeDuplicates(terms.map(getTermYear));

  return (
    <div className={clsx(className, "rounded-md p-3 border w-full overflow-x-scroll")}>
      <div className={"w-[109vw] md:w-full grid grid-cols-[1.9fr_2fr_2fr_2fr_2fr_2.5fr] gap-3"}>
        <div></div>
        {termCodes.map((term) => {
          return (
            <div key={term.id} className="text-gray-500 font-bold text-xs md:text-sm">
              {term.name}
            </div>
          );
        })}
        {years.map((year) => {
          const actualYear = parseInt(year);
          const academicYear = `${actualYear - 1}–${year.slice(-2)}`;
          return (
            <Fragment key={year}>
              <div className="text-gray-500 font-bold text-xs md:text-sm tabular-nums text-left">{academicYear}</div>
              {termCodes.map((term) => {
                const fullTermId = year + term.id;
                const offerredInTerm = terms.includes(fullTermId);
                return (
                  <div
                    key={term.id}
                    className={clsx("text-sm", {
                      "bg-green-50 dark:bg-green-950 rounded-md flex items-center text-sm text-gray-700 dark:text-gray-500 px-1": offerredInTerm,
                    })}
                  >
                    {offerredInTerm && "Offerred"}
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
