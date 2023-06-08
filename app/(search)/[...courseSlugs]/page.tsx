import { getCourse } from "@/api/courses";
import { SectionTermMatrix } from "@/components/course/sections/section-term-matrix";
import { Sections } from "@/components/course/sections/sections";
import { NotionPage } from "@/components/notion-page";
import { Title } from "@/components/title";
import { slugToCourse2 } from "@/course";
import { queryCourseDatabase } from "@/notion/database";
import { getNotionPageMentions, getNotionRecordMap } from "@/notion/page";
import { getCourseTerms } from "@/term";
import { ClientCourseInfo } from "./client-course-info";
import { CourseNotes } from "./course-notes";
import { MobileCourseSearchBackButton } from "./mobile-back-button";

export const revalidate = 3600; // revalidate this page every X seconds

interface Props {
  params: { courseSlugs: string[] };
}

export default async function CoursePage({ params }: Props) {
  const courseSlugs = params.courseSlugs;

  const courses = await Promise.all(
    courseSlugs.map(async (courseSlug) => {
      const course = slugToCourse2(courseSlug);
      const courseInfo = await getCourse(course.subject, course.number);

      const rows = await queryCourseDatabase(course);
      if (rows.results.length === 0) {
        return { courseInfo, hasNotionPageContent: false, notionRecordMap: null, pageMentions: null };
      }

      const notionDatabaseResult = (await queryCourseDatabase(course)).results[0];
      const notionRecordMap = await getNotionRecordMap(notionDatabaseResult.id);
      const hasNotionPageContent = Object.keys(notionRecordMap.block).length > 2;

      const pageMentions = await getNotionPageMentions(notionDatabaseResult.id);

      return { courseInfo, hasNotionPageContent, notionRecordMap, pageMentions };
    })
  );

  return (
    <div className="px-5 md:p-5 w-full md:mx-auto md:max-w-[75ch]">
      {/* Mobile only back button */}
      <div className="md:hidden mt-5 mb-2">
        <MobileCourseSearchBackButton />
      </div>

      <div className="mb-2 divide-y">
        {courses.map(({ courseInfo, notionRecordMap, pageMentions, hasNotionPageContent }, index) => {
          const terms = courseInfo ? getCourseTerms(courseInfo) : [];
          return (
            <div key={index} className="pt-10 first:pt-0 pb-10">
              <Title className="mb-2 tabular-nums">
                {courseInfo.subject} {courseInfo.number}: {courseInfo.title}
              </Title>

              <ClientCourseInfo course={courseInfo} />

              <SectionTermMatrix className="mt-10" terms={getCourseTerms(courseInfo)} />

              <CourseNotes className="mt-10">
                {hasNotionPageContent && notionRecordMap && pageMentions ? (
                  <NotionPage recordMap={notionRecordMap} pageMentions={pageMentions} />
                ) : (
                  <div className="italic">No content for this page.</div>
                )}
              </CourseNotes>

              <Title className="mt-10" level={3}>
                Sections
              </Title>

              <div className="mt-2 space-y-3">
                {terms.map((termCode) => {
                  return <Sections key={termCode} termCode={termCode} course={courseInfo} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
