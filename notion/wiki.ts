import { getBlocksChildrenList, queryNotionDatabase } from "@/api/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { constants } from "./constants";

export interface WikiArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  tagIds: string[];
}

export const wikiTags = {
  courses: "2db834fb-6c55-4cdf-8cb5-7a5d08a1f2b0",
  faq: "ab467acb-ec80-47d2-9cab-65afa0434cf1",
  test: "0eeb34ff-8263-41ad-afb5-0f012bd99c35",
};

export async function getWikiArticles() {
  const response = await queryNotionDatabase(constants.WIKI_DATABASE_ID);
  const wikiArticles: WikiArticle[] = [];

  const rowProperties = response.results
    .filter((result): result is PageObjectResponse => "properties" in result)
    .map((result) => result.properties);

  const rows = response.results.filter((result): result is PageObjectResponse => "properties" in result);

  rows.forEach((row) => {
    // @ts-ignore
    const slug = row.properties["Slug"].rich_text[0].plain_text;
    // @ts-ignore
    const title = row.properties["Title"].title[0].plain_text;
    // @ts-ignore
    const tagIds = row.properties["Tags"].multi_select.map((multi_select) => multi_select.id);
    // @ts-ignore
    const description = row.properties["Description"].rich_text[0].plain_text;
    wikiArticles.push({ id: row.id, slug, title, tagIds, description });
  });

  return wikiArticles;
}

export async function getWikiArticleBySlug(slug: string) {
  const response = await queryNotionDatabase(constants.WIKI_DATABASE_ID, {
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  const page = response.results[0];
  return page;
}


