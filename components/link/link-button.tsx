"use client";

import { ReactNode } from "react";
import { UniversalLink } from "../universal-link";

interface LinkButtonProps {
  href: string;
  icon?: ReactNode;
  title: string;
}

export function LinkButton({ href, icon, title }: LinkButtonProps) {
  return (
    <UniversalLink
      href={href}
      className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-100 flex items-center space-x-4"
    >
      {icon && <div>{icon}</div>}
      <div className="text-sm font-semibold text-gray">{title}</div>
    </UniversalLink>
  );
}
