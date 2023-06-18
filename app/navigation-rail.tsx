"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { FaLink, FaRegBookmark, FaSearch, FaTable } from "react-icons/fa";

export function NavigationRail() {
  const pathname = usePathname();

  const excludedPaths = ["/plan", "/hub", "/wiki"];
  const isOnSearch = pathname.startsWith("/") && !excludedPaths.some((path) => pathname.startsWith(path));

  return (
    <div className="w-16 border-r h-full">
      <div className="h-[5rem] p-5 flex justify-center items-center">
        <div className="w-5 h-5 bg-gray-500 rounded-md"></div>
      </div>
      <div className="flex justify-center items-center">
        <div className="space-y-2">
          <RailTabButton href="/hub" active={pathname?.startsWith("/hub") ?? false} title="Hub">
            <FaLink />
          </RailTabButton>
          <RailTabButton href="/wiki" active={pathname?.startsWith("/wiki") ?? false} title="Wiki">
            <FaRegBookmark />
          </RailTabButton>
          <RailTabButton href="/" active={isOnSearch} title="Search">
            <FaSearch />
          </RailTabButton>
          <RailTabButton href="/plan" active={pathname?.startsWith("/plan") ?? false} title="Plan">
            <FaTable />
          </RailTabButton>
        </div>
      </div>
    </div>
  );
}

interface RailTabButton extends ComponentProps<"div"> {
  href: string;
  active: boolean;
  title: string;
}
function RailTabButton({ href, active, title, children }: RailTabButton) {
  return (
    <Link
      href={href}
      className={clsx("block text-gray-600 p-4 rounded-lg hover:bg-gray-50", { "bg-gray-100": active })}
    >
      {children}
    </Link>
  );
}
