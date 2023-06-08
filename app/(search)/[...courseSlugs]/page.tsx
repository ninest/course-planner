import { getCourse } from "@/api/courses";
import { Button } from "@/components/button";
import { SectionTermMatrix } from "@/components/course/sections/section-term-matrix";
import { Sections } from "@/components/course/sections/sections";
import { NotionPage } from "@/components/notion-page";
import { TransparentHeader } from "@/components/sticky-transparent-header";
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
  await new Promise(resolve => setTimeout(resolve, 31290312));
  const courseSlugs = params.courseSlugs;

  const courses = await Promise.all(
    courseSlugs.map(async (courseSlug) => {
      const course = slugToCourse2(courseSlug);

      const courseInfoPromise = getCourse(course.subject, course.number);
      const rowsPromise = queryCourseDatabase(course);
      const [courseInfo, rows] = await Promise.all([courseInfoPromise, rowsPromise]);

      if (rows.results.length === 0) {
        return { courseInfo, hasNotionPageContent: false, notionRecordMap: null, pageMentions: null };
      }

      const notionDatabaseResult = rows.results[0];

      const notionRecordMapPromise = getNotionRecordMap(notionDatabaseResult.id);
      const pageMentionsPromise = getNotionPageMentions(notionDatabaseResult.id);
      const [notionRecordMap, pageMentions] = await Promise.all([notionRecordMapPromise, pageMentionsPromise]);

      const hasNotionPageContent = Object.keys(notionRecordMap.block).length > 2;
      return { courseInfo, hasNotionPageContent, notionRecordMap, pageMentions };
    })
  );

  return (
    <>
      {/* Mobile only back button */}
      <TransparentHeader className="md:hidden sticky top-0 px-5 py-3">
        <MobileCourseSearchBackButton />
      </TransparentHeader>

      <div className="px-5 md:p-5 w-full md:mx-auto md:max-w-[75ch]">
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
                    // TODO: use UniversalLink here
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

                <div className="mt-5 space-y-2">
                  <Button
                    size={"sm"}
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdIzBLNUhuc1OMyPCPAKwDBo4gpvqcK78OY9yaoCoJ3YMxTkQ/viewform?usp=sf_link"
                  >
                    Share course information
                  </Button>

                  <div className="text-sm">
                    If you have any information related to {courseInfo.subject} {courseInfo.number} (syllabus, textbook,
                    etc.), please share it!
                  </div>
                </div>

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
    </>
  );
}
