import { Button } from "@/components/button";
import { getCourse } from "@/api/courses";
import { slugToCourse } from "@/utils/course/course";
import { ChevronLeft } from "lucide-react";
import { CourseInfo } from "./course-info";
import { SectionsList } from "./sections-list";

interface CourseQueryProps {
  params: { termCode: string; planId: string; courseSlug: string };
}

export default async function CourseQueryPage({ params }: CourseQueryProps) {
  const { subject, number } = slugToCourse(params.courseSlug);
  const course = await getCourse(subject, number);
  if (!course) throw new Error("Course not found");

  return (
    <>
      <div className="p-5">
        <Button
          intent={"ghost"}
          href={`/${params.termCode}/${params.planId}`}
          className="-ml-2 flex items-center space-x-2"
        >
          <ChevronLeft className="" />{" "}
        </Button>
        <h3 className="my-1 font-bold">
          {course.subject} {course.number}: {course.title}
        </h3>

        <CourseInfo course={course} />
      </div>

      <hr />

      <div className="p-5">
        <SectionsList
          termCode={params.termCode}
          course={course}
        />
      </div>
    </>
  );
}
