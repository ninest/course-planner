import clsx from "clsx";
import { ComponentProps } from "react";

interface TransparentHeader extends ComponentProps<"div"> {}

export function TransparentHeader({ className, children, ...props }: TransparentHeader) {
  return (
    <div className={clsx(className, "bg-white/90 backdrop-blur-sm z-20")} {...props}>
      {children}
    </div>
  );
}
