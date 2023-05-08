"use client";

import { CourseInfo } from "@/components/course/course-info";
import { Loading } from "@/components/loading";
import { SubPageBackButton } from "@/components/sub-page-back-button";
import { Title } from "@/components/title";
import { useCourse } from "@/hooks/fetching/use-course";
import { courseToSlug2, slugToCourse2 } from "@/utils/course/course";
import { usePathname, useSearchParams } from "next/navigation";

interface PlanCoursePageProps {
  params: { termCode: string; planId: string; courseSlug: string };
}

export default function PlanCoursePage({ params }: PlanCoursePageProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!pathname) return <div className="p-3">Loading ...</div>;

  // Get course from URL
  const courseSlug = pathname.split("/").at(-1)!;
  const minimizedCourse = slugToCourse2(courseSlug);

  const { isCourseLoading, course } = useCourse(minimizedCourse);

  return (
    <div className="p-3">
      <SubPageBackButton href={`/plan/${params.termCode}/${params.planId}?${searchParams}`} />

      {isCourseLoading || !course ? (
        <Loading heights={[3]} />
      ) : (
        <div>
          <Title level={2} className="text-xl tabular-nums">
            {course.subject} {course.number}: {course.title}
          </Title>
          <CourseInfo
            course={course}
            courseHrefFn={(course) =>
              `/plan/${params.termCode}/${params.planId}/${courseToSlug2(course)}?${searchParams}`
            }
          />
        </div>
      )}
    </div>
  );
}
