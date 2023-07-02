import { getCourse } from "@/api/courses";
import { SectionTermMatrix } from "@/components/course/sections/section-term-matrix";
import { Sections } from "@/components/course/sections/sections";
import { Loading } from "@/components/loading";
import { TransparentHeader } from "@/components/sticky-transparent-header";
import { Title } from "@/components/title";
import { slugToCourse2 } from "@/course";
import { getCourseTerms } from "@/term";
import { Suspense } from "react";
import { FaCaretRight } from "react-icons/fa";
import { ClientCourseInfo } from "./client-course-info";
import { CourseNotes } from "./course-notes-new";
import { MobileCourseSearchBackButton } from "./mobile-back-button";

export const revalidate = 3600;

interface Props {
  params: { courseSlugs: string[] };
}

export async function generateMetadata({ params }: Props) {
  const courseSlugs = params.courseSlugs;
  const courses = courseSlugs.map((courseSlug) => {
    const course = slugToCourse2(courseSlug);
    return course;
  });
  return {
    title: `${courses[0].subject} ${courses[0].number}`,
  };
}

export default async function CoursePage({ params }: Props) {
  const courseSlugs = params.courseSlugs;
  const courses = await Promise.all(
    courseSlugs.map(async (courseSlug) => {
      const course = slugToCourse2(courseSlug);
      const courseInfo = await getCourse(course.subject, course.number);
      const googleFormLink = `https://docs.google.com/forms/d/e/1FAIpQLSdIzBLNUhuc1OMyPCPAKwDBo4gpvqcK78OY9yaoCoJ3YMxTkQ/viewform?usp=pp_url&entry.1345775324=${encodeURI(
        course.subject + " " + course.number
      )}&entry.1467381516=${encodeURI(courseInfo.title)}`;
      return { course, courseInfo, googleFormLink };
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
          {courses.map(({ course, courseInfo, googleFormLink }, index) => {
            const terms = courseInfo ? getCourseTerms(courseInfo) : [];
            return (
              <div key={index} className="pt-10 first:pt-0 pb-10">
                <Title level={1} className="mb-2 tabular-nums">
                  {courseInfo.subject} {courseInfo.number}: {courseInfo.title}
                </Title>

                <Suspense fallback={<Loading heights={[3]} />}>
                  <ClientCourseInfo course={courseInfo} />
                </Suspense>

                <section className="mt-10 lg:-mx-2 xl:-mx-5">
                  <SectionTermMatrix terms={getCourseTerms(courseInfo)} />
                </section>

                <details className="mt-10" open>
                  <summary className="list-none flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Title level={3}>Notes</Title>
                      <FaCaretRight />
                    </div>
                    <a href={googleFormLink} target="_blank" className="underline text-sm">
                      contribute
                    </a>
                  </summary>
                  <div className="mt-2 lg:-mx-2 xl:-mx-5 p-3 md:p-5 border rounded-md">
                    <Suspense fallback={<Loading heights={[5]} />}>
                      {/* @ts-ignore */}
                      <CourseNotes course={course} formLink={googleFormLink} />
                    </Suspense>
                  </div>
                </details>

                <details className="mt-10" open>
                  <summary className="list-none flex items-center space-x-2">
                    <Title level={3}>Sections</Title>
                    <FaCaretRight />
                  </summary>
                  <div className="mt-2 space-y-3">
                    {terms.map((termCode) => {
                      return <Sections key={termCode} termCode={termCode} course={courseInfo} />;
                    })}
                  </div>
                </details>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
