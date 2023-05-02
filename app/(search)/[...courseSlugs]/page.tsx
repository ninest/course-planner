"use client";

import { CourseInfo } from "@/components/course/course-info";
import { SubPageBackButton } from "@/components/sub-page-back-button";
import { Title } from "@/components/title";
import { useCourses } from "@/hooks/fetching/use-course";
import { useSearchUrlParam } from "@/hooks/url/use-search-url-param";
import { useUrlCourse } from "@/hooks/url/use-url-course";
import { courseToSlug2 } from "@/utils/course/course";

interface Props {
  params: { courseSlugs: string[] };
}

export default function CoursePage({ params }: Props) {
  const param = useSearchUrlParam();

  // const { subject, number } = slugToCourse2(params.courseSlugs[0]);
  const courses = useUrlCourse();
  const results = useCourses(courses!);
  // const { course } = useCourse({ subject, number });

  return (
    <div className="px-5 md:p-5 w-full md:mx-auto md:max-w-[75ch]">
      <div className="md:hidden mb-2">
        <SubPageBackButton href={`/?${param}`} />
      </div>

      <div className="mb-2 divide-y">
        {results.map((result, index) => (
          <div key={index} className="pt-10 first:pt-0 pb-10">
            {result.isLoading && <>Loading ...</>}
            {!result.isLoading && result.data && (
              <div>
                <Title className="mb-2 tabular-nums">
                  {result.data.subject} {result.data.number}: {result.data.title}
                </Title>
                <CourseInfo course={result.data} courseHrefFn={(course) => `/${courseToSlug2(course)}?${param}`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
