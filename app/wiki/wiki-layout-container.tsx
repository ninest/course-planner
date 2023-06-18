"use client";

import { UniversalLink } from "@/components/universal-link";
import { WikiArticle } from "@/notion/wiki";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { WikiPageList } from "./wiki-page-list";

export function WikiPageLayoutContainer({ articles, children }: { articles: WikiArticle[]; children: ReactNode }) {
  const pathname = usePathname();
  const onWikiPage = pathname !== "/wiki";

  return (
    <main>
      {/* Mobile */}
      <div className="md:hidden">
        {onWikiPage ? (
          <>{children}</>
        ) : (
          <div className="p-5 space-y-1">
            <WikiPageList articles={articles} />
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex md:h-screen">
        <div className="md:w-[300px] lg:w-[400px] md:overflow-y-scroll md:border-r">
          <div className="p-5 space-y-1">
            <WikiPageList articles={articles} />
          </div>
        </div>
        <div className="flex-1 h-screen overflow-y-scroll">{children}</div>
      </div>
    </main>
  );
}
