import clsx from "clsx";
import { HTMLAttributes } from "react";

interface TitleProps extends HTMLAttributes<HTMLTitleElement> {
  level?: number;
}

export function Title({ level = 2, children, ...props }: TitleProps) {
  // https://stackoverflow.com/a/59685929/8677167
  const H = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <H
      className={clsx(
        "font-display tracking-normal text-gray-800",
        {
          "text-4xl font-bold": level == 1,
          "text-3xl font-black": level == 2,
          "text-lg font-bold": level == 3,
          "text-base font-bold": level == 4,
        },
        props.className
      )}
    >
      {children}
    </H>
  );
}
