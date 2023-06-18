import { getBlocksChildrenList, retrieveNotionPage } from "@/api/notion";

export type PageMention = { id: string; type: "course-link" | "wiki-link"; title: string; href: string };
export async function getNotionPageMentions(pageId: string) {
  const pageMentions: PageMention[] = [];

  const blocks = await getBlocksChildrenList(pageId);

  for await (const block of blocks.results) {
    if ("paragraph" in block) {
      const parts = block.paragraph.rich_text;

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
