"use client";

import { ReactNode } from "react";
import { UniversalLink } from "../universal-link";
import clsx from "clsx";

interface LinkButtonProps {
  href: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  title: string;
  size?: "sm" | "base";
}

export function LinkButton({ href, iconLeft, iconRight, title, size = "base" }: LinkButtonProps) {
  return (
    <UniversalLink
      href={href}
      className={clsx(
        "rounded-lg flex items-center",
        "bg-gray-50 hover:bg-gray-100 border border-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800 dark:shadow",
        {
          "p-3 space-x-4": size === "base",
          "p-2 space-x-2": size === "sm",
        }
      )}
    >
      {iconLeft && <div>{iconLeft}</div>}
      <div
        className={clsx("font-semibold text-gray", {
          "text-sm": size === "base",
          "text-xs": size === "sm",
        })}
      >
        {title}
      </div>
      {iconRight && <div>{iconRight}</div>}
    </UniversalLink>
  );
}
