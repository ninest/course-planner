// import { Client } from "@notionhq/client";
import { queryNotionDatabase } from "@/api/notion";
import type { QueryDatabaseResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { constants } from "./constants";

// const notionhq = new Client({ auth: process.env.NOTION_API_KEY });

export interface HuskerLink {
  title: string;
  categoryIds: string[];
  description: string;
  url: string;
  filterIds: string[];
}

export const linkFilterMap = {
  graduateOnly: "ukCx",
  undergraduateOnly: "nT[|",
};

export async function getLinks() {
  const response = await queryNotionDatabase(constants.LINKS_DATABASE_ID, {
    sorts: [{ property: "Order", direction: "ascending" }],
  });
  const links: HuskerLink[] = [];

  const rowProperties = response.results
    .filter((result): result is PageObjectResponse => "properties" in result)
    .map((result) => result.properties);

  rowProperties.forEach((properties) => {
    // @ts-ignore
    const title = properties["Title"].title[0].plain_text;
    // @ts-ignore
    const categoryIds = properties["Categories"].relation.map((relation) => relation.id);
    // @ts-ignore
    const filterIds = properties["Filters"].multi_select.map((multi_select) => multi_select.id);
    // @ts-ignore
    const url = properties["URL"].url;
    // @ts-ignore
    const description = properties["Short Description"].rich_text[0].plain_text;

    links.push({ title, url, description, categoryIds, filterIds });
  });

  return links;
}
