import { Client } from "@notionhq/client";
// import { NotionAPI } from "notion-client";

const notionhq = new Client({ auth: process.env.NOTION_API_KEY });
// const notion = new NotionAPI();

export function getNotionRecordMap(pageId: string) {
  // return notion.getPage(pageId);
}

export function getNotionPageBlocks(pageId: string) {
  return notionhq.blocks.children.list({ block_id: pageId });
}
