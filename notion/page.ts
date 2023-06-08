import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

const notionhq = new Client({ auth: process.env.NOTION_API_KEY });
const notion = new NotionAPI();

export function getNotionRecordMap(pageId: string) {
  return notion.getPage(pageId);
}

export function getNotionPageBlocks(pageId: string) {
  return notionhq.blocks.children.list({ block_id: pageId });
}

export type PageMention = { id: string; type: "course-link"; title: string; href: string };
export async function getNotionPageMentions(pageId: string) {
  const pageMentions: PageMention[] = [];

  const blocks = await notionhq.blocks.children.list({ block_id: pageId });

  for await (const block of blocks.results) {
    if ("paragraph" in block) {
      const parts = block.paragraph.rich_text;

      for await (const part of parts) {
        if (part.type === "mention" && part.href !== null) {
          const mentionedPageId = part.href.split("notion.so/")[1];
          const mentionedPageTitle = part.plain_text;

          const fullNotionPage = await notionhq.pages.retrieve({ page_id: mentionedPageId });

          if (
            "properties" in fullNotionPage &&
            "Subject" in fullNotionPage.properties &&
            "Number" in fullNotionPage.properties
          ) {
            const subject = fullNotionPage.properties["Subject"].rich_text[0].plain_text;
            const number = fullNotionPage.properties["Number"].number;
            pageMentions.push({
              id: mentionedPageId,
              type: "course-link",
              title: mentionedPageTitle,
              href: `/${subject}${number}`,
            });
          }
        }
      }
    }
  }

  return pageMentions;
}
