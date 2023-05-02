import { Course, MinimizedCourse } from "@/.data/types";
import { hasSectionInTerm } from "@/utils/course/section";
import clsx from "clsx";
import Link from "next/link";
import { CourseDetail } from "./course-detail";
import { CourseHrefFn } from "./types";

interface CourseDetailListProps {
  termCode?: string;
  courses: Course[];
  selectedCourses?: Pick<Course, "subject" | "number">[];
  courseHrefFn: CourseHrefFn;
}

export function CourseDetailList({ termCode, courses, selectedCourses, courseHrefFn }: CourseDetailListProps) {
  const coursesInTerm = courses.filter((course) =>
    termCode === "all" ? courses : hasSectionInTerm(course, termCode ?? "")
  );

  return (
    <div className="space-y-0.5">
      {coursesInTerm.map((course, index) => {
        const isSelected = selectedCourses?.find((sc) => sc.number === course.number && sc.subject === course.subject);
        return (
          <Link
            key={index}
            href={courseHrefFn(course)}
            className={clsx("block -mx-1 py-1 px-1 rounded-md", {
              "hover:bg-gray-100": !isSelected,
              "bg-primary-50": isSelected,
            })}
          >
            <CourseDetail termCode={termCode} course={course} />
          </Link>
        );
      })}
    </div>
  );
}
