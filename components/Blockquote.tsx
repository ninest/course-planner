import clsx from "clsx";
import { ComponentProps } from "react";

interface BlockquoteProps extends ComponentProps<"blockquote"> {}

export function Blockquote({ children }: BlockquoteProps) {
  return <blockquote className={clsx("border-l-4 border-gray-600 text-lg pl-2 py-2 font-medium")}>{children}</blockquote>;
}
