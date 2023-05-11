import { Course, MinimizedCourse } from "@/.data/types";
import { hasSectionInTerm } from "@/course/section";
import clsx from "clsx";
import Link from "next/link";
import { CourseDetail } from "./course-detail";
import { CourseHrefFn } from "./types";

interface CourseDetailListProps {
  termCode?: string;
  courses: Course[];
  selectedCourses?: MinimizedCourse[];
  courseHrefFn: CourseHrefFn;
}

export function CourseDetailList({ termCode, courses, selectedCourses, courseHrefFn }: CourseDetailListProps) {
  return (
    <div className="space-y-0.5">
      {/* TODO: put courses in term at the top */}
      {courses.map((course, index) => {
        const isInTerm = termCode === "all" || hasSectionInTerm(course, termCode ?? "")
        const isSelected = selectedCourses?.find((sc) => sc.number === course.number && sc.subject === course.subject);
        return (
          <Link
            key={index}
            href={courseHrefFn(course)}
            className={clsx("block -mx-1 py-1 px-1 rounded-md", {
              "hover:bg-gray-100": !isSelected,
              "bg-primary-50": isSelected,
              "opacity-50 hover:opacity-100": !isInTerm
            })}
          >
            <CourseDetail termCode={termCode} course={course} />
          </Link>
        );
      })}
    </div>
  );
}
