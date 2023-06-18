import { getWikiArticles } from "@/notion/wiki";
import { ReactNode } from "react";
import { WikiPageLayoutContainer } from "./wiki-layout-container";

export default async function WikiPageLayout({ children }: { children: ReactNode }) {
  const articles = await getWikiArticles();

  return <WikiPageLayoutContainer articles={articles}>{children}</WikiPageLayoutContainer>;
}
