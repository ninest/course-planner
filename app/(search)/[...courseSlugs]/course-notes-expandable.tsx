import { MinimizedCourse } from "@/.data/types";
import { getBlocksChildrenList } from "@/api/notion";
import { Button } from "@/components/button";
import { NotionPage } from "@/components/notion/page";
import { queryCourseDatabase } from "@/notion/courses";
import { PageMention, getNotionPageMentions } from "@/notion/mentions";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { ComponentProps } from "react";
import { CourseNotes } from "./course-notes";

interface CourseNotesExpandableProps extends ComponentProps<"div"> {
  course: MinimizedCourse;
}

export async function CourseNotesExpandable({ course, className }: CourseNotesExpandableProps) {
  const { hasNotionPageContent, blocks, pageMentions } = await getNotionCourseInfo(course);
  const hasCourseNotes = hasNotionPageContent && blocks && pageMentions;

  return (
    <div className={className}>
      <CourseNotes>
        {hasCourseNotes ? (
          <>
            {/* @ts-ignore */}
            <NotionPage blocks={blocks} mentions={pageMentions} />
          </>
        ) : (
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdIzBLNUhuc1OMyPCPAKwDBo4gpvqcK78OY9yaoCoJ3YMxTkQ/viewform?usp=sf_link"
            target={"_blank"}
            className="block text-sm"
          >
            <span className="italic">
              No content for this page.{" "}
              <span className="underline">Click here to share syllabi or other information!</span>
            </span>
          </a>
        )}
      </CourseNotes>

      <div className="mt-3 space-y-2">
        <Button
          size={"sm"}
          href="https://docs.google.com/forms/d/e/1FAIpQLSdIzBLNUhuc1OMyPCPAKwDBo4gpvqcK78OY9yaoCoJ3YMxTkQ/viewform?usp=sf_link"
        >
          Share course information
        </Button>

        <div className="text-sm">
          If you have any information related to {course.subject} {course.number} (syllabus, textbook, etc.), please
          share it!
        </div>
      </div>
    </div>
  );
}

type GetNotionCourseInfo =
  | { hasNotionPageContent: false; blocks: null; pageMentions: null }
  | { hasNotionPageContent: true; blocks: BlockObjectResponse[]; pageMentions: PageMention[] };
async function getNotionCourseInfo(course: MinimizedCourse): Promise<GetNotionCourseInfo> {
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
