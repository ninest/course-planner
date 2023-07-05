import { getBlocksChildrenList, queryNotionDatabase, retrieveNotionPage } from "@/api/notion";
import type { GetPageResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
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

  wikiArticles.sort((a, b) => a.title.localeCompare(b.title));

  return wikiArticles;
}

function transformNotionPageToWikiArticle(page: GetPageResponse) {
  if (!("properties" in page)) throw new Error(`In properties in page provided for transform`);

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

export async function getWikiArticleBySlug(slug: string) {
  const response = await queryNotionDatabase(constants.WIKI_DATABASE_ID, {
    filter: { property: "Slug", rich_text: { equals: slug } },
  });
  const page = response.results[0];

  return transformNotionPageToWikiArticle(page as PageObjectResponse);
}

export async function getWikiArticle(id: string) {
  const response = await retrieveNotionPage(id);
  return transformNotionPageToWikiArticle(response);
}
