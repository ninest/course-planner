import { getCourse } from "@/api/courses";
import { SectionTermMatrix } from "@/components/course/sections/section-term-matrix";
import { Sections } from "@/components/course/sections/sections";
import { Loading } from "@/components/loading";
import { TransparentHeader } from "@/components/sticky-transparent-header";
import { Title } from "@/components/title";
import { slugToCourse2 } from "@/course";
import { getCourseTerms } from "@/term";
import { Suspense } from "react";
import { ClientCourseInfo } from "./client-course-info";
import { CourseNotesExpandable } from "./course-notes-expandable";
import { MobileCourseSearchBackButton } from "./mobile-back-button";

export const revalidate = 3600;

interface Props {
  params: { courseSlugs: string[] };
}

export default async function CoursePage({ params }: Props) {
  const courseSlugs = params.courseSlugs;
  const courses = await Promise.all(
    courseSlugs.map(async (courseSlug) => {
      const course = slugToCourse2(courseSlug);
      const courseInfo = await getCourse(course.subject, course.number);
      return { course, courseInfo };
    })
  );

  return (
    <>
      {/* Mobile only back button */}
      <TransparentHeader className="md:hidden sticky top-0 px-5 py-3">
        <Suspense fallback={<Loading className="md:hidden w-10" heights={[2]} />}>
          <MobileCourseSearchBackButton />
        </Suspense>
      </TransparentHeader>

      <div className="px-5 md:p-5 w-full md:mx-auto md:max-w-[75ch]">
        <div className="mb-2 divide-y">
          {courses.map(({ course, courseInfo }, index) => {
            const terms = courseInfo ? getCourseTerms(courseInfo) : [];
            return (
              <div key={index} className="pt-10 first:pt-0 pb-10">
                <Title className="mb-2 tabular-nums">
                  {courseInfo.subject} {courseInfo.number}: {courseInfo.title}
                </Title>

                <Suspense fallback={<Loading heights={[3]} />}>
                  <ClientCourseInfo course={courseInfo} />
                </Suspense>

                <SectionTermMatrix className="mt-10" terms={getCourseTerms(courseInfo)} />

                <Suspense
                  fallback={
                    <>
                      <Loading className="mt-10" heights={[9]} />
                    </>
                  }
                >
                  {/* @ts-ignore */}
                  <CourseNotesExpandable course={course} className="mt-10" />
                </Suspense>

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
