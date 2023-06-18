import { LinkButton } from "@/components/link/link-button";
import { Title } from "@/components/title";
import { getLinks, linkCategories, linkCategoryMap } from "@/notion/links";
import { ReactNode } from "react";

export default async function HubLayout({ children }: { children: ReactNode }) {
  const links = await getLinks();

  return (
    <>
      <main className="p-5 md:max-w-[80ch] md:mx-auto">
        <div>
          {linkCategories.map((category) => {
            const catLinks = links.filter((link) => link.categoryId === linkCategoryMap[category.categoryKey]);
            return (
              <section className="mb-4">
                <Title level={2}>{category.title}</Title>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {catLinks.map((courseLink) => {
                    return <LinkButton href={courseLink.url} title={courseLink.title} />;
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
