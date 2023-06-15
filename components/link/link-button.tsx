"use client"

import { UniversalLink } from "../universal-link";

interface LinkButtonProps {
  href: string;
  title: string;
}

export function LinkButton({ href, title }: LinkButtonProps) {
  return (
    <UniversalLink href={href} className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-100">
      <div className="text-sm font-semibold text-gray">{title}</div>
    </UniversalLink>
  );
}
