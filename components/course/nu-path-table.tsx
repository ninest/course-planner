import { nuPath, NUPath } from "@/.data/types";
import { CheckCircle2 } from "lucide-react";

interface NUPathTableProps {
  path: NUPath[];
}

export const NUPathTable = ({ path }: NUPathTableProps) => {
  return (
    <section className="flex">
      <div className="rounded-md overflow-x-scroll border dark:border-gray-800 flex divide-x dark:divide-gray-800">
        {nuPath.map((np) => (
          <div key={np} className="w-10">
            <div className="p-xs bg-gray-50 dark:bg-gray-900 text-gray text-xs text-center">
              {np}
            </div>
            <div className="h-7 p-xs border-t dark:border-gray-800 flex items-center justify-center">
              {path.includes(np) && (
                <CheckCircle2 className="w-3 dark:text-primary-darker" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
