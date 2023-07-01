import { Course } from "@/.data/types";
import { ComponentProps } from "react";
import { getNotionCourseInfo } from "./functions";
import { NotionPage } from "@/components/notion/page";

export async function CourseNotes({
  course,
  formLink,
  children,
}: ComponentProps<"div"> & { course: Course; formLink: string }) {
  const { hasNotionPageContent, blocks, pageMentions } = await getNotionCourseInfo(course);
  const hasCourseNotes = hasNotionPageContent && blocks && pageMentions;

  if (hasCourseNotes)
    return (
      <>
        {/* @ts-ignore */}
        <NotionPage blocks={blocks} mentions={pageMentions} />
      </>
    );
  else
    return (
      <>
        <a href={formLink} target="_blank">
          <i className="text-sm">
            No course notes. If you have any information related to{" "}
            <b>
              {course.subject} {course.number}
            </b>{" "}
            (syllabus, textbooks, etc.), please <span className="underline">click here to share it</span>!
          </i>
        </a>
      </>
    );
}
