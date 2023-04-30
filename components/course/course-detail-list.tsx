import { Course } from "@/.data/types";
import { hasSectionInTerm } from "@/utils/course/section";
import Link from "next/link";
import { CourseDetail } from "./course-detail";

interface CourseDetailListProps {
  termCode?: string;
  courses: Course[];
  hrefFn: (course: Course) => string;
}

export function CourseDetailList({ termCode, courses, hrefFn }: CourseDetailListProps) {
  const coursesInTerm = courses.filter((course) =>
    termCode === "all" ? courses : hasSectionInTerm(course, termCode ?? "")
  );

  return (
    <div className="space-y-0.5">
      {coursesInTerm.map((course, index) => (
        <Link key={index} href={hrefFn(course)} className="block -mx-1 py-1 px-1 rounded-md hover:bg-gray-50">
          <CourseDetail termCode={termCode} course={course} />
        </Link>
      ))}
    </div>
  );
}
