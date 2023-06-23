import { getWikiArticles } from "@/notion/wiki";
import { ReactNode } from "react";
import { WikiPageLayoutContainer } from "./wiki-layout-container";
import { getCategories } from "@/notion/categories";

export const revalidate = 1000;

export default async function WikiPageLayout({ children }: { children: ReactNode }) {
  const categories = await getCategories();
  const articles = await getWikiArticles();

  return (
    <WikiPageLayoutContainer articles={articles} categories={categories}>
      {children}
    </WikiPageLayoutContainer>
  );
}
