"use client";

import clsx from "clsx";
import { ComponentProps, ReactNode, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Title } from "./title";

interface ExpandableProps extends ComponentProps<"div"> {
  title: string;
  details?: string;
  right?: ReactNode;
  borderBetween: boolean; // border between title block and children?
  children: ReactNode;
  initiallyOpen?: boolean;
}

export function Expandable({
  title,
  details,
  right,
  borderBetween = false,
  initiallyOpen,
  className,
  children,
}: ExpandableProps) {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <div className={clsx(className, "border rounded-md")}>
      <div
        onClick={() => setOpen(!open)}
        className={clsx(
          "cursor-pointer p-3 sticky top-0 z-10 bg-white flex items-center justify-between space-x-2",
          { "rounded-t-md": open, "rounded-md": !open },
          { "border-b": borderBetween && open }
        )}
      >
        <div className="w-full flex items-center justify-between">
          <div className="">
            <Title level={4} className="font-medium">
              {title}
            </Title>
            {details && <div className="text-gray-600 text-sm tabular-nums">{details}</div>}
          </div>
          {right}
        </div>
        <div className={clsx({ "rotate-180": open })}>
          <FaCaretDown />
        </div>
      </div>

      {open && <>{children}</>}
    </div>
  );
}
