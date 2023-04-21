import { Course } from "@/.data/types";
import { CourseDetail } from "./course/course-detail";

interface CourseDetailListProps {
  courses: Course[];
}

export function CourseDetailList({ courses }: CourseDetailListProps) {
  return (
    <div className="space-y-2">
      {courses.map((course, index) => (
        <CourseDetail key={index} course={course} />
      ))}
    </div>
  );
}
