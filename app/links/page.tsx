import { LinkButton } from "@/components/link/link-button";
import { NotionIconDisplay } from "@/components/notion/icon";
import { Title } from "@/components/title";
import { UniversalLink } from "@/components/universal-link";
import { getLinksCategories } from "@/notion/categories";
import { getLinks } from "@/notion/links";

export default async function HubPage() {
  const categories = await getLinksCategories();
  const links = await getLinks();
  return (
    <div>
      {categories.map((category) => {
        const catLinks = links.filter((link) => link.categoryIds.includes(category.id));
        return (
          <section id={category.id} className="mb-8">
            <div className="flex items-center justify-between">
              <Title level={2} className="text-2xl font-extrabold">
                {category.title}
              </Title>
                {category.wikiArticle && (
                  <UniversalLink href={`/wiki/${category.wikiArticle.slug}`} className="text-sm underline">
                    {category.wikiArticle.title} wiki
                  </UniversalLink>
                )}
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {catLinks.map((courseLink) => {
                return (
                  <LinkButton
                    href={courseLink.url}
                    icon={courseLink.icon && <NotionIconDisplay icon={courseLink.icon} className="w-5" />}
                    title={courseLink.title}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
