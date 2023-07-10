import { Course } from "@/.data/types";
import { getNotionCoursePage } from "../functions";
import { CourseContributeDialog } from "./course-contribute-dialog";
import { getCourseGoogleFormHref } from "@/course/functions";

export async function CourseContributeButton({ course }: { course: Course }) {
  const page = await getNotionCoursePage(course)!;
  const googleFormUrl = getCourseGoogleFormHref(course);
  // @ts-ignore
  const notionUrl = page!.public_url
  return (
    <>
      <CourseContributeDialog googleFormUrl={googleFormUrl} notionUrl={notionUrl}>
        <button className="underline text-sm">contribute</button>
      </CourseContributeDialog>
    </>
  );
}
