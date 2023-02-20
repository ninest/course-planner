import clsx from "clsx";
import { HTMLProps } from "react";

interface LabelProps extends HTMLProps<HTMLLabelElement> {
  subtext?: string;
}

export const Label = ({ className, subtext, ...props }: LabelProps) => {
  return (
    <label
      className={clsx("block font-medium text-gray-500", className)}
      {...props}
    >
      {props.children}
      {subtext && <div className="mt-0.5 text-xs text-gray-400">{subtext}</div>}
    </label>
  );
};
