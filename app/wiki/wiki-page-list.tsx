import { UniversalLink } from "@/components/universal-link";
import { WikiArticle } from "@/notion/wiki";

export function WikiPageList({ articles }: { articles: WikiArticle[] }) {
  return (
    <>
      {articles.map((article) => {
        return (
          <UniversalLink
            key={article.slug}
            href={`/wiki/${article.slug}`}
            className="block rounded-md -mx-2 px-2 py-1 hover:bg-gray-100 text-sm"
            activeClassName="bg-primary-50"
          >
            <div className="font-bold text-gray-800">{article.title}</div>
            <div>{article.description}</div>
          </UniversalLink>
        );
      })}
    </>
  );
}
