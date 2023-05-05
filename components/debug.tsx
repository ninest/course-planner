import clsx from "clsx";
import { ComponentProps } from "react";

interface DebugProps extends ComponentProps<"div"> {
  data: any;
}

export const Debug = ({ data, className }: DebugProps) => {
  const isDev = process && process.env.NODE_ENV === "development";
  return (
    <>
      {isDev && (
        <pre
          className={clsx(className, "bg-[#112] p-2 text-gray-300 text-xxs rounded-lg", "overflow-scroll max-w-full")}
          suppressHydrationWarning
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </>
  );
};
