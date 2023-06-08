import clsx from "clsx";
import { ComponentProps } from "react";

interface LoadingProps extends ComponentProps<"div"> {
  heights: (number | { type: "spacer"; height: number })[];
}

export function Loading({ heights, className }: LoadingProps) {
  return (
    <div className={clsx(className, "space-y-0.5")}>
      {heights.map((height, index) => {
        if (typeof height === "number")
          return (
            <div key={index} style={{ height: `${height}rem` }} className="bg-gray-100 rounded-md animate-pulse"></div>
          );
        else {
          if (height.type === "spacer")
            return <div key={index} style={{ height: `${height.height}rem` }} aria-hidden></div>;
        }
      })}
    </div>
  );
}

interface SkeletonProps extends ComponentProps<"div"> {}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={`${className} bg-gray-50 rounded-md animate-pulse`}></div>;
}
