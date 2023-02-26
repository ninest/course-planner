import { getCourse } from "@/api/courses";
import { Button } from "@/components/button";
import { slugToCourse } from "@/utils/course/course";
import { ChevronLeft } from "lucide-react";
import { CourseInfo } from "./course-info";
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
      <div className="px-5">
        <Button
          intent={"ghost"}
          href={`/${params.termCode}/${params.planId}`}
          className="-ml-2 flex items-center space-x-2"
        >
          <ChevronLeft className="" />
        </Button>
        <h3 className="my-1 font-bold">
          {course.subject} {course.number}: {course.title}
        </h3>

        <CourseInfo course={course} />
      </div>
      <hr className="my-5" />
      <div className="px-5">
        {/* @ts-expect-error Server Component */}
        <SectionsList termCode={params.termCode} course={course} />
      </div>
    </>
  );
}
