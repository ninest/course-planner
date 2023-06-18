// import { Client } from "@notionhq/client";
import { queryNotionDatabase } from "@/api/notion";
import type { QueryDatabaseResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { constants } from "./constants";

// const notionhq = new Client({ auth: process.env.NOTION_API_KEY });

export interface HuskerLink {
  title: string;
  categoryId: string;
  shortDescription: string;
  description?: string;
  url: string;
  filterIds: string[];
}
export const linkCategories = {
  courses: "h^h",
};
export const linkFilters = {
  graduateOnly: "ukCx",
  undergraduateOnly: "nT[|",
};

export async function getLinks() {
  const response = await queryNotionDatabase(constants.LINKS_DATABASE_ID)
  const links: HuskerLink[] = [];

  const rowProperties = response.results
    .filter((result): result is PageObjectResponse => "properties" in result)
    .map((result) => result.properties);

  rowProperties.forEach((properties) => {
    // @ts-ignore
    const title = properties["Title"].title[0].plain_text;
    // @ts-ignore
    const categoryId = properties["Category"].select.id;
    // @ts-ignore
    const filterIds = properties["Filters"].multi_select.map((multi_select) => multi_select.id);

    // @ts-ignore
    const url = properties["URL"].url;
    // @ts-ignore
    const shortDescription = properties["Short Description"].rich_text[0].plain_text;
    const description =
      // @ts-ignore
      properties["Description"].rich_text.length > 0 ? properties["Description"].rich_text[0].plain_text : null;

    links.push({ title, url, shortDescription, description, categoryId, filterIds });
  });

  return links;
}
