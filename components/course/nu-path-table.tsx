import { nuPath, NUPath } from "@/.data/types";
import { CheckCircle2, Divide } from "lucide-react";

interface NUPathTableProps {
  path: NUPath[];
}

export const NUPathTable = ({ path }: NUPathTableProps) => {
  return (
    <section className="flex w-full overflow-x-scroll">
      <div className="rounded-md border dark:border-gray-800 flex w-full divide-x dark:divide-gray-800">
        {nuPath.map((np) => (
          <div key={np} className="flex-1">
            <div className="p-1 dark:bg-gray-900 text-gray-500 font-bold text-xs text-center">{np}</div>
            <div className="h-7 p-xs border-t dark:border-gray-800 flex items-center justify-center">
              {path.includes(np) && <CheckCircle2 className="w-3 dark:text-primary-darker" />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
