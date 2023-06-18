import { getBlocksChildrenList, retrieveNotionPage } from "@/api/notion";
import { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type PageMention = { id: string; type: "course-link" | "wiki-link"; title: string; href: string };
export async function getNotionPageMentions(pageId: string) {
  const pageMentions: PageMention[] = [];

  const blocks = await getBlocksChildrenList(pageId);
  const mentions = await getMentionsFromBlocks(blocks.results);
  mentions.forEach((m) => pageMentions.push(m));

  return pageMentions;
}

async function getMentionsFromBlocks(blocks: (PartialBlockObjectResponse | BlockObjectResponse)[]) {
  const pageMentions: PageMention[] = [];
  for await (const block of blocks) {
    // TODO: improve this code
    if ("paragraph" in block || "bulleted_list_item" in block) {
      let parts: any;
      if ("paragraph" in block) parts = block.paragraph.rich_text;
      else if ("bulleted_list_item" in block) parts = block.bulleted_list_item.rich_text;

      for await (const part of parts) {
        if (part.type === "mention" && part.href !== null) {
          const mentionedPageId = part.href.split("notion.so/")[1];
          const mentionedPageTitle = part.plain_text;

          const fullNotionPage = await retrieveNotionPage(mentionedPageId);

          if (
            "properties" in fullNotionPage &&
            "Subject" in fullNotionPage.properties &&
            "Number" in fullNotionPage.properties
          ) {
            // TODO
            // @ts-ignore
            const subject = fullNotionPage.properties["Subject"].rich_text[0].plain_text;
            // @ts-ignore
            const number = fullNotionPage.properties["Number"].number;
            pageMentions.push({
              id: mentionedPageId,
              type: "course-link",
              title: mentionedPageTitle,
              href: `/${subject}${number}`,
            });
          } else if (
            "properties" in fullNotionPage &&
            "Slug" in fullNotionPage.properties &&
            "Tags" in fullNotionPage.properties &&
            "Description" in fullNotionPage.properties
          ) {
            // @ts-ignore
            const slug = fullNotionPage.properties["Slug"].rich_text[0].plain_text;
            pageMentions.push({
              id: mentionedPageId,
              type: "wiki-link",
              title: mentionedPageTitle,
              href: `/wiki/${slug}`,
            });
          }
        }
      }
    }
  }
  return pageMentions;
}
