import { getBlocksChildrenList, queryNotionDatabase } from "@/api/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { constants } from "./constants";

export interface WikiArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  categoryIds: string[];
  metadata?: ArticleMetadata;
}
interface ArticleMetadata {
  createdAt: Date;
  lastEditedAt: Date;
}

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
    const categoryIds = row.properties["Categories"].relation.map((relation) => relation.id);
    // @ts-ignore
    const description = row.properties["Description"].rich_text[0].plain_text;
    wikiArticles.push({ id: row.id, slug, title, categoryIds, description });
  });

  return wikiArticles;
}

export async function getWikiArticleBySlug(slug: string) {
  const response = await queryNotionDatabase(constants.WIKI_DATABASE_ID, {
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  const page = response.results[0];

  if (!("properties" in page)) throw new Error(`In properties in page ${slug}`);

  const metadata: ArticleMetadata = {
    createdAt: new Date(page.created_time),
    lastEditedAt: new Date(page.last_edited_time),
  };

  const article: WikiArticle = {
    id: page.id,
    // @ts-ignore
    slug: page.properties["Slug"].rich_text[0].plain_text,
    // @ts-ignore
    title: page.properties["Title"].title[0].plain_text,
    // @ts-ignore
    categoryIds: page.properties["Categories"].relation.map((relation) => relation.id),
    // @ts-ignore
    description: page.properties["Description"].rich_text[0].plain_text,
    metadata,
  };

  return article;
}
