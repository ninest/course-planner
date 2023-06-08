import { getCourse } from "@/api/courses";
import { slugToCourse2 } from "@/course";
import { Title } from "@/components/title";
import { MobileCourseSearchBackButton } from "./mobile-back-button";
import { SectionTermMatrix } from "@/components/course/sections/section-term-matrix";
import { getCourseTerms } from "@/term";
import { Sections } from "@/components/course/sections/sections";
import { ClientCourseInfo } from "./client-course-info";

interface Props {
  params: { courseSlugs: string[] };
}

export default async function CoursePage({ params }: Props) {
  const courseSlugs = params.courseSlugs;
  const courses = await Promise.all(
    courseSlugs.map(async (courseSlug) => {
      const course = slugToCourse2(courseSlug);
      return getCourse(course.subject, course.number);
    })
  );

  return (
    <div className="px-5 md:p-5 w-full md:mx-auto md:max-w-[75ch]">
      {/* Mobile only back button */}
      <div className="md:hidden mt-5 mb-2">
        <MobileCourseSearchBackButton />
      </div>

      <div className="mb-2 divide-y">
        {courses.map((course, index) => {
          const terms = course ? getCourseTerms(course) : [];
          return (
            <div className="pt-10 first:pt-0 pb-10">
              <Title className="mb-2 tabular-nums">
                {course.subject} {course.number}: {course.title}
              </Title>

              <ClientCourseInfo course={course} />

              <SectionTermMatrix className="mt-10" terms={getCourseTerms(course)} />

              <Title className="mt-10" level={3}>
                Sections
              </Title>

              <div className="mt-2 space-y-3">
                {terms.map((termCode) => {
                  return <Sections key={termCode} termCode={termCode} course={course} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
