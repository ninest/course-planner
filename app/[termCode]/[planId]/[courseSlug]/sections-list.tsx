import { Course } from "@/.data/types";
import { getSectionsForCourse } from "@/api/sections";
import { SectionItem } from "./section-item";

interface SectionsListProps {
  termCode: string;
  course: Course;
}

export const SectionsList = async ({ termCode, course }: SectionsListProps) => {
  const sections = await getSectionsForCourse(
    termCode,
    course.subject,
    course.number
  );

  return (
    <div>
      <h3 className="font-bold mb-1">Sections</h3>
      <div className="space-y-2 -mx-1">
        {sections.map((section, index) => {
          if (!section)
            return (
              <div key={index}>Failed to fetch section. Try reloading</div>
            );

          return <SectionItem key={index} course={course} section={section} />;
        })}
      </div>
    </div>
  );
};
