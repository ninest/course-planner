import { MinimizedCourse } from "@/.data/types";
import { getBlocksChildrenList } from "@/api/notion";
import { queryCourseDatabase } from "@/notion/courses";
import { PageMention, getNotionPageMentions } from "@/notion/mentions";
import { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type GetNotionCourseInfo =
  | { hasNotionPageContent: false; blocks: null; pageMentions: null }
  | { hasNotionPageContent: true; blocks: BlockObjectResponse[]; pageMentions: PageMention[] };
export async function getNotionCourseInfo(course: MinimizedCourse): Promise<GetNotionCourseInfo> {
  const rows = await queryCourseDatabase(course);
  if (rows.results.length === 0) {
    return { hasNotionPageContent: false, blocks: null, pageMentions: null };
  }

  const page = rows.results[0];
  const blocksResponsePromise = getBlocksChildrenList(page.id);
  const mentionsPromise = getNotionPageMentions(page.id);
  const [blocksResponse, mentions] = await Promise.all([blocksResponsePromise, mentionsPromise]);

  const blocks = blocksResponse.results;
  if (blocks.length === 0) {
    return { hasNotionPageContent: false, blocks: null, pageMentions: null };
  }

  return { hasNotionPageContent: true, blocks: blocks as BlockObjectResponse[], pageMentions: mentions };
}

export async function getNotionCoursePage(course: MinimizedCourse) {
  const rows = await queryCourseDatabase(course);
  if (rows.results.length === 0) {
    return null;
  }

  const page = rows.results[0] as PageObjectResponse;
  return page
}
