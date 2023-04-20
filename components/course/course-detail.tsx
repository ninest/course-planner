import { Course } from "@/.data/types";

interface CourseDetailProps {
  course: Course;
}

export function CourseDetail({ course }: CourseDetailProps) {
  return (
    <div className="bg-gray-50 p-3 rounded-md hover:bg-indigo-50">
      {/* Course name */}
      <div>
        <span className="font-bold">
          {course.subject} {course.number}
        </span>
        <span> {course.title}</span>
      </div>
    </div>
  );
}
