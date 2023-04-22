import { Course } from "@/.data/types";

interface CourseDetailProps {
  termCode?: string;
  course: Course;
}

export function CourseDetail({ termCode, course }: CourseDetailProps) {
  const showSectionCount = termCode !== "all";
  const numSections = course.sections.filter((section) => section.term === termCode).length;

  return (
    <div className="bggray-50 py-3 rounded-md hover:bg-gray-50">
      {/* Course name */}
      <div>
        <span className="font-bold">
          {course.subject} {course.number}
        </span>
        <span> {course.title}</span>
      </div>

      {/* Num sections */}
      {showSectionCount && <div className="mt-1 text-sm text-gray-600">{numSections} sections</div>}
    </div>
  );
}
