"use client";

import { useUrlCourse } from "@/app/(search)/hooks/use-search-url-course";
import { useSearchUrlParam } from "@/app/(search)/hooks/use-search-url-param";
import { CourseInfo } from "@/components/course/course-info";
import { SectionTermMatrix } from "@/components/course/sections/section-term-matrix";
import { Sections } from "@/components/course/sections/sections";
import { Debug } from "@/components/debug";
import { Loading } from "@/components/loading";
import { SubPageBackButton } from "@/components/sub-page-back-button";
import { Title } from "@/components/title";
import { useCourses } from "@/hooks/fetching/use-course";
import { courseToSlug2 } from "@/utils/course/course";
import { getCourseTerms } from "@/utils/course/terms";

interface Props {
  params: { courseSlugs: string[] };
}

export default function CoursePage({ params }: Props) {
  const searchUrlParams = useSearchUrlParam();

  const courses = useUrlCourse();
  const results = useCourses(courses!);

  return (
    <div className="px-5 md:p-5 w-full md:mx-auto md:max-w-[75ch]">
      <div className="md:hidden mb-2">
        <SubPageBackButton href={`/?${searchUrlParams.toString()}`} />
      </div>

      <div className="mb-2 divide-y">
        {results.map((result, index) => {
          const { isLoading, data: course } = result;
          const terms = course ? getCourseTerms(course) : [];
          return (
            <div key={index} className="pt-10 first:pt-0 pb-10">
              {isLoading && (
                <>
                  <Loading
                    heights={[
                      3,
                      { type: "spacer", height: 1 },
                      1,
                      { type: "spacer", height: 1 },
                      2,
                      { type: "spacer", height: 1 },
                      3,
                    ]}
                  />
                </>
              )}
              {!isLoading && course && (
                <div>
                  <Title className="mb-2 tabular-nums">
                    {course.subject} {course.number}: {course.title}
                  </Title>
                  <CourseInfo
                    course={course}
                    courseHrefFn={(course) => `/${courseToSlug2(course)}?${searchUrlParams}`}
                  />

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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
