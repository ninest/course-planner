"use client";

import { Empty } from "@/components/Empty";
import { LinkButton } from "@/components/link/link-button";
import { NotionIconDisplay } from "@/components/notion/icon";
import { Title } from "@/components/title";
import { UniversalLink } from "@/components/universal-link";
import { Category } from "@/notion/categories";
import { HuskerLink } from "@/notion/links";
import { useState } from "react";

export function LinksDisplay({ categories, links }: { categories: Category[]; links: HuskerLink[] }) {
  const [query, setQuery] = useState("");
  return (
    <div>
      <form className="mb-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search links ..."
          className="form-field w-full"
        />
      </form>

      <div>
        {categories.map((category) => {
          const catLinks = links.filter(
            (link) =>
              link.categoryIds.includes(category.id) &&
              // Search
              link.title.toLowerCase().includes(query.toLowerCase())
          );
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
                {catLinks.length === 0 ? (
                  <Empty className="p-5 flex items-center justify-center">No links found</Empty>
                ) : (
                  catLinks.map((courseLink) => {
                    return (
                      <LinkButton
                        href={courseLink.url}
                        icon={courseLink.icon && <NotionIconDisplay icon={courseLink.icon} className="w-5" />}
                        title={courseLink.title}
                      />
                    );
                  })
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
