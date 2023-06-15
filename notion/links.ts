import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { constants } from "./constants";

const notionhq = new Client({ auth: process.env.NOTION_API_KEY });

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
  const response = await notionhq.databases.query({
    database_id: constants.LINKS_DATABASE_ID,
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  const links: HuskerLink[] = [];

  const rowProperties = response.results
    .filter((result): result is PageObjectResponse => "properties" in result)
    .map((result) => result.properties);

  rowProperties.forEach((p) => {
    // console.log(p["Filters"]);
  });

  rowProperties.forEach((properties) => {
    const title = properties["Title"].title[0].plain_text;
    const categoryId = properties["Category"].select.id;
    const filterIds = properties["Filters"].multi_select.map((multi_select) => multi_select.id);

    const url = properties["URL"].url;
    const shortDescription = properties["Short Description"].rich_text[0].plain_text;
    const description =
      properties["Description"].rich_text.length > 0 ? properties["Description"].rich_text[0].plain_text : null;

    links.push({ title, url, shortDescription, description, categoryId, filterIds });
  });

  return links;
}
