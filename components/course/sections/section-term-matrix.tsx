import { getTermYear, termCodes } from "@/utils/course/terms";
import { groupBy, removeDuplicates } from "@/utils/list";
import clsx from "clsx";
import { ComponentProps, Fragment } from "react";

export interface SectionTermMatrixProps extends ComponentProps<"div"> {
  terms: string[];
}

export function SectionTermMatrix({ terms, className }: SectionTermMatrixProps) {
  const groups = groupBy(terms, getTermYear);
  const years = removeDuplicates(terms.map(getTermYear));

  return (
    <div className={clsx(className, "w-full grid  grid-cols-[1fr_2fr_2fr_2fr_2fr_2fr] gap-1", "rounded-md border p-1")}>
      <div></div>
      {termCodes.map((term) => {
        return (
          <div key={term.id} className="text-gray-500 font-bold text-xs md:text-sm">
            {term.name}
          </div>
        );
      })}
      {years.map((year) => {
        return (
          <Fragment key={year}>
            <div className="text-gray-500 font-bold text-sm md:text-base tabular-nums">{year}</div>
            {termCodes.map((term) => {
              const fullTermId = year + term.id;
              const offerredInTerm = terms.includes(fullTermId);
              return (
                <div
                  key={term.id}
                  className={clsx("text-sm", {
                    "bg-green-100 rounded-md flex items-center justify-center": offerredInTerm,
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
    // <table className={clsx(className, "w-full table-fixed border-collapse border")}>
    //   <thead className="text-center">
    //     <tr>
    //       <th></th>
    //       {termCodes.map((term) => {
    //         return <th key={term.id}>{term.name}</th>;
    //       })}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {years.map((year) => {
    //       const terms = groups[year];
    //       return (
    //         <tr key={year}>
    //           <th>{year}</th>
    //           {termCodes.map((term) => {
    //             const fullTermId = year + term.id;
    //             const offerredInTerm = terms.includes(fullTermId);
    //             return <th key={term.id}>{offerredInTerm ? "Offerred" : "Not"}</th>;
    //           })}
    //         </tr>
    //       );
    //     })}
    //   </tbody>
    // </table>
  );
}
