import { queryNotionDatabase } from "@/api/notion";
import { constants } from "./constants";
import type { PageObjectResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export interface Category {
  id: string;
  title: string;
}

function transformNotionResponseToCategories(response: QueryDatabaseResponse) {
  const categories: Category[] = [];
  const results = response.results.filter((result): result is PageObjectResponse => "properties" in result);
  results.forEach((row) => {
    const { properties } = row;

    const id = row.id;
    // @ts-ignore
    const title = properties["Title"].title[0].plain_text;
    categories.push({ id, title });
  });
  return categories;
}

export async function getLinksCategories() {
  const response = await queryNotionDatabase(constants.CATEGORIES_DATABASE_ID, {
    filter: { property: "Is Links Category", checkbox: { equals: true } },
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return transformNotionResponseToCategories(response);
}

export async function getCategories() {
  const response = await queryNotionDatabase(constants.CATEGORIES_DATABASE_ID, {
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return transformNotionResponseToCategories(response);
}
