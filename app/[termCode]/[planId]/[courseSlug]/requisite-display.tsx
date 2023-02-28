import { PrerequisiteItem, Requisite } from "@/.data/types";
import { Button } from "@/components/button";
import { useCurrentPlanId, useCurrentTermCode } from "@/utils/route";
import clsx from "clsx";

interface RequisiteDisplayProps {
  coreqs: Requisite[];
  prereqs: PrerequisiteItem[];
}

export const RequisiteDisplay = ({
  coreqs,
  prereqs,
}: RequisiteDisplayProps) => {
  const termCode = useCurrentTermCode();
  const planId = useCurrentPlanId();
  return (
    <div className="space-y-2">
      {coreqs.length > 0 && (
        <div>
          <div className="text-sm mb-1">Co-requisites</div>
          <div className="flex">
            {coreqs.map((reqItem, index) => {
              const link = `/${termCode}/${planId}/${reqItem.subject}-${reqItem.number}`;
              return (
                <Button
                  key={index}
                  intent={"secondary"}
                  size={"xs"}
                  href={link}
                >
                  {reqItem.subject}
                  {reqItem.number}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {prereqs.length > 0 && (
        <div>
          <div className="text-sm mb-1">Pre-requisites</div>
          <div className="-mt-xs flex flex-wrap items-baseline">
            {prereqs.map((reqItem, index) => {
              const marginClassNames = "mr-1 mt-xs";
              if (typeof reqItem === "object") {
                const link = `/${termCode}/${planId}/${reqItem.subject}-${reqItem.number}`;
                return (
                  <Button
                    key={index}
                    className={marginClassNames}
                    intent={"secondary"}
                    size={"xs"}
                    href={link}
                  >
                    {reqItem.subject}
                    {reqItem.number}
                  </Button>
                );
              }
              return (
                <div
                  key={index}
                  className={clsx(
                    "text-xs font-medium",
                    {
                      // Non course pre-reqs
                      italic: !["And", "Or", "(", ")"].includes(reqItem),
                      // Show and/or in lower case and muted
                      "lowercase text-gray-600": ["And", "Or"].includes(
                        reqItem
                      ),
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
        </div>
      )}
    </div>
  );
};
