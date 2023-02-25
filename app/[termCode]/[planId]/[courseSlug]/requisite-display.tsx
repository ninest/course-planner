import { PrerequisiteItem, Requisite } from "@/.data/types";
import { Button } from "@/components/button";
import clsx from "clsx";

interface RequisiteDisplayProps {
  coreqs: Requisite[];
  prereqs: PrerequisiteItem[];
}

export const RequisiteDisplay = ({
  coreqs,
  prereqs,
}: RequisiteDisplayProps) => {
  return (
    <div className="">
      {coreqs.length > 0 && (
        <>
          <div className="text-sm mb-1">Co-requisites</div>
          <div className="flex">
            {coreqs.map((reqItem, index) => (
              <Button key={index} intent={"secondary"} size={"xs"}>
                {reqItem.subject}
                {reqItem.number}
              </Button>
            ))}
          </div>
        </>
      )}

      {prereqs.length > 0 && (
        <>
          <div className="text-sm mb-1">Pre-requisites</div>
          <div className="-mt-xs flex flex-wrap items-baseline">
            {prereqs.map((reqItem, index) => {
              const marginClassNames = "mr-1 mt-xs";
              if (typeof reqItem === "object")
                return (
                  <Button
                    key={index}
                    className={marginClassNames}
                    intent={"secondary"}
                    size={"xs"}
                  >
                    {reqItem.subject}
                    {reqItem.number}
                  </Button>
                );

              return (
                <div
                  key={index}
                  className={clsx(
                    "text-xs font-medium",
                    {
                      // Non course pre-reqs
                      italic: !["And", "Or", "(", ")"].includes(reqItem),
                      // Show and/or in lower case and muted
                      "lowercase text-gray-600": ["And", "Or"].includes(reqItem),
                      // Make brackets bolder
                      "scale-y-[1.4] md:scale-x-125": ["(", ")"].includes(
                        reqItem
                      ),
                    },
                    marginClassNames
                  )}
                >
                  {reqItem}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
