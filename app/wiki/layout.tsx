import { UniversalLink } from "@/components/universal-link";
import { getWikiArticles } from "@/notion/wiki";
import { ReactNode } from "react";

export default async function WikiPageLayout({ children }: { children: ReactNode }) {
  const articles = await getWikiArticles();

  return (
    <main>
      {/* Mobile */}
      <div className="md:hidden">rotate your phone lol</div>

      {/* Desktop */}
      <div className="hidden md:flex md:h-screen">
        <div className="md:w-[300px] lg:w-[400px] md:overflow-y-scroll md:border-r">
          <div className="p-5 space-y-3">
            {articles.map((article) => {
              return (
                <UniversalLink
                  key={article.slug}
                  href={`/wiki/${article.slug}`}
                  className="block rounded-md -mx-2 px-2 py-1 hover:bg-gray-100"
                  activeClassName="bg-primary-50"
                >
                  <div className="font-semibold text-gray-800">{article.title}</div>
                  <div>{article.description}</div>
                </UniversalLink>
              );
            })}
          </div>
        </div>
        <div className="flex-1 h-screen overflow-y-scroll">{children}</div>
      </div>
    </main>
  );
}
