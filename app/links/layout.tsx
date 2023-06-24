import { LinkButton } from "@/components/link/link-button";
import { Title } from "@/components/title";
import { getLinksCategories } from "@/notion/categories";
import { getLinks } from "@/notion/links";
import { ReactNode } from "react";

export default async function HubLayout({ children }: { children: ReactNode }) {
  const categories = await getLinksCategories();
  const links = await getLinks();

  console.log(links)

  return (
    <>
      <main className="p-5 md:max-w-[80ch] md:mx-auto">
        <div>
          {categories.map((category) => {
            const catLinks = links.filter((link) => link.categoryIds.includes(category.id));
            return (
              <section id={category.id} className="mb-8">
                <Title level={2} className="text-2xl font-extrabold">{category.title}</Title>
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
