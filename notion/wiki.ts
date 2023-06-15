import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { constants } from "./constants";

const notionhq = new Client({ auth: process.env.NOTION_API_KEY });

export interface WikiArticle {
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
  const response = await notionhq.databases.query({
    database_id: constants.WIKI_DATABASE_ID,
  });

  const wikiArticles: WikiArticle[] = [];

  const rowProperties = response.results
    .filter((result): result is PageObjectResponse => "properties" in result)
    .map((result) => result.properties);

  rowProperties.forEach((properties) => {
    const slug = properties["Slug"].rich_text[0].plain_text;
    const title = properties["Title"].title[0].plain_text;
    const tagIds = properties["Tags"].multi_select.map((multi_select) => multi_select.id);
    const description = properties["Description"].rich_text[0].plain_text;
    wikiArticles.push({ slug, title, tagIds, description });
  });

  return wikiArticles;
}

export async function getWikiArticleBlocks(slug: string) {
  const response = await notionhq.databases.query({
    database_id: constants.WIKI_DATABASE_ID,
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  if (response.results.length < 1) throw new Error(`Invalid wiki slug ${slug}`);

  const pageId = response.results[0].id;

  const blocks = await notionhq.blocks.children.list({ block_id: pageId });
  return blocks
}
