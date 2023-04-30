"use client";

import { CourseInfo } from "@/components/course/course-info";
import { SubPageBackButton } from "@/components/sub-page-back-button";
import { Title } from "@/components/title";
import { useCourse } from "@/hooks/fetching/use-course";
import { useSearchUrlParam } from "@/hooks/search/url-param";
import { slugToCourse2 } from "@/utils/course/course";

interface Props {
  params: { courseSlugs: string[] };
}

export default function CoursePage({ params }: Props) {
  const param = useSearchUrlParam();

  const { subject, number } = slugToCourse2(params.courseSlugs[0]);
  const { course, isCourseLoading } = useCourse(subject, number);

  return (
    <div className="p-5 w-full md:mx-auto md:max-w-[90ch]">
      <div className="md:hidden mb-2">
        <SubPageBackButton href={`/?${param}`} />
      </div>

      {course && (
        <div className="mt-1 rounded-lg">
          <Title className="mb-2 tabular-nums">
            {course.subject} {course.number}: {course.title}
          </Title>

          <CourseInfo course={course} />
        </div>
      )}
    </div>
  );
}
