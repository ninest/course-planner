"use client";

import { UniversalLink } from "@/components/universal-link";
import { WikiArticle } from "@/notion/wiki";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { WikiPageList } from "./wiki-page-list";
import { Category } from "@/notion/categories";

export function WikiPageLayoutContainer({
  articles,
  categories,
  children,
}: {
  articles: WikiArticle[];
  categories: Category[];
  children: ReactNode;
}) {
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
            <WikiPageList articles={articles} categories={categories} />
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex md:h-screen">
        <div className="md:w-[300px] lg:w-[400px] md:overflow-y-scroll md:border-r">
          <div className="space-y-1">
            <WikiPageList articles={articles} categories={categories} />
          </div>
        </div>
        <div className="flex-1 h-screen overflow-y-scroll">{children}</div>
      </div>
    </main>
  );
}
