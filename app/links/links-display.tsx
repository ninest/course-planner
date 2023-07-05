"use client";

import { Empty } from "@/components/Empty";
import { LinkButton } from "@/components/link/link-button";
import { NotionIconDisplay } from "@/components/notion/icon";
import { Title } from "@/components/title";
import { UniversalLink } from "@/components/universal-link";
import { Category } from "@/notion/categories";
import { HuskerLink } from "@/notion/links";
import { useState } from "react";
import { FaArrowRight, FaCaretRight } from "react-icons/fa";

export function LinksDisplay({
  appCategory,
  categories,
  links,
}: {
  appCategory: Category;
  categories: Category[];
  links: HuskerLink[];
}) {
  const appLinks = links.filter((link) => link.categoryIds.includes(appCategory.id));
  const [query, setQuery] = useState("");

  const linkInSearch = (link: HuskerLink, query: string) => {
    return link.title.toLowerCase().includes(query.toLowerCase());
  };

  const resultsCount = links.filter((link) => linkInSearch(link, query)).length;

  return (
    <div>
      <form className="mb-7">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search links ..."
          className="form-field w-full"
        />
      </form>

      <div className="mb-7 -mx-1 border p-3 rounded-lg">
        <details>
          <summary className="list-none">
            <div className="flex items-center justify-between">
              <Title level={3} className="text-base">
                Apps
              </Title>
              <FaCaretRight />
            </div>
          </summary>
          <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
            {appLinks.map((link) => {
              return (
                <LinkButton
                size="sm"
                  href={link.url}
                  iconLeft={link.icon && <NotionIconDisplay icon={link.icon} className="w-4" />}
                  title={link.title}
                />
              );
            })}
          </div>
        </details>
      </div>

      <div>
        {resultsCount === 0 && (
          <Empty className="p-5">
            <div>No links found</div>
            <div className="mt-1">
              <UniversalLink href={"/"} className="flex items-center space-x-2">
                <span className="underline">Search courses</span>
                <FaArrowRight className="w-3" />
              </UniversalLink>
              <UniversalLink href={"/wiki"} className="flex items-center space-x-2">
                <span className="underline">Search wiki</span>
                <FaArrowRight className="w-3" />
              </UniversalLink>
            </div>
          </Empty>
        )}
        {categories.map((category) => {
          const catLinks = links.filter((link) => link.categoryIds.includes(category.id) && linkInSearch(link, query));
          return (
            <>
              {catLinks.length === 0 ? (
                <></>
              ) : (
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
                          iconLeft={courseLink.icon && <NotionIconDisplay icon={courseLink.icon} className="w-5" />}
                          title={courseLink.title}
                        />
                      );
                    })}
                  </div>
                </section>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
