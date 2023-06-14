import { MinimizedCourse } from "@/.data/types";
import { Button } from "@/components/button";
import { NotionPage } from "@/components/notion-page";
import { queryCourseDatabase } from "@/notion/database";
import { getNotionPageMentions, getNotionRecordMap, PageMention } from "@/notion/page";
import { ExtendedRecordMap } from "notion-types";
import { ComponentProps } from "react";
import { CourseNotes } from "./course-notes";

interface CourseNotesExpandableProps extends ComponentProps<"div"> {
  course: MinimizedCourse;
}

export async function CourseNotesExpandable({ course, className }: CourseNotesExpandableProps) {
  const { hasNotionPageContent, notionRecordMap, pageMentions } = await getNotionCourseInfo(course);
  const hasCourseNotes = hasNotionPageContent && notionRecordMap && pageMentions;

  return (
    <div className={className}>
      <CourseNotes>
        {hasCourseNotes ? (
          <NotionPage recordMap={notionRecordMap} pageMentions={pageMentions} />
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
  | { hasNotionPageContent: false; notionRecordMap: null; pageMentions: null }
  | { hasNotionPageContent: true; notionRecordMap: ExtendedRecordMap; pageMentions: PageMention[] };
async function getNotionCourseInfo(course: MinimizedCourse): Promise<GetNotionCourseInfo> {
  const rows = await queryCourseDatabase(course);
  if (rows.results.length === 0) {
    return { hasNotionPageContent: false, notionRecordMap: null, pageMentions: null };
  }

  const page = rows.results[0];

  const notionRecordMapPromise = getNotionRecordMap(page.id);
  const pageMentionsPromise = getNotionPageMentions(page.id);
  const [notionRecordMap, pageMentions] = await Promise.all([notionRecordMapPromise, pageMentionsPromise]);

  const hasNotionPageContent = Object.keys(notionRecordMap.block).length > 2;
  if (!hasNotionPageContent) {
    return { hasNotionPageContent: false, notionRecordMap: null, pageMentions: null };
  }

  return { hasNotionPageContent: true, notionRecordMap, pageMentions };
}
