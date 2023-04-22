"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { SearchHeader } from "./search-header";
import { SearchResults } from "./search-results";

export default function SearchLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showingCourses = pathname !== "/";

  return (
    <main>
      <SearchHeader />
      {/* Mobile */}
      <div className="md:hidden">{showingCourses ? <>{children}</> : <SearchResults />}</div>

      {/* Desktop */}
      <div className="hidden md:flex md:h-[calc(100vh-5rem)]">
        <div className="md:w-[350px] lg:w-[450px] md:overflow-y-scroll md:border-r">
          <SearchResults />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}
