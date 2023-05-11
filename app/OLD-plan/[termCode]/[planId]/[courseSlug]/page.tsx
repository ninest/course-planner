import { getCourse } from "@/api/courses";
import { Button } from "@/components/button";
import { SubPageBackButton } from "@/components/sub-page-back-button";
import { slugToCourse } from "@/course";
import { ChevronLeft } from "lucide-react";
import { CourseInfo } from "../../../../../components/course/course-info";
import { SectionsList } from "./sections-list";

export const revalidate = 0; // no cache

interface CourseQueryProps {
  params: { termCode: string; planId: string; courseSlug: string };
}

export default async function CourseQueryPage({ params }: CourseQueryProps) {
  const { subject, number } = slugToCourse(params.courseSlug);
  const course = await getCourse(subject, number);
  if (!course) throw new Error("Course not found");

  return (
    <>
      <div className="px-5 mt-5">
        <SubPageBackButton href={`/plan/${params.termCode}/${params.planId}`} />
        <h2 className="my-1 font-bold">
          {course.subject} {course.number}: {course.title}
        </h2>

        {/* TODO */}
        <CourseInfo course={course} courseHrefFn={(course) => ``} />
      </div>
      <hr className="my-10" />
      <div className="px-5">
        <SectionsList planId={params.planId} termCode={params.termCode} course={course} />
      </div>
    </>
  );
}
