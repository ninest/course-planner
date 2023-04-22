import { Course } from "@/.data/types";
import { useSearchUrlParam } from "@/hooks/search/url-param";
import { courseToSlug2 } from "@/utils/course/course";
import { hasSectionInTerm } from "@/utils/course/section";
import Link from "next/link";
import { CourseDetail } from "./course-detail";

interface CourseDetailListProps {
  termCode?: string;
  courses: Course[];
}

export function CourseDetailList({ termCode, courses }: CourseDetailListProps) {
  const params = useSearchUrlParam();

  const coursesInTerm = courses.filter((course) =>
    termCode === "all" ? courses : hasSectionInTerm(course, termCode ?? "")
  );

  return (
    <div className="space-y-2">
      {coursesInTerm.map((course, index) => (
        <Link key={index} href={`/${courseToSlug2(course)}?${params}`} className="block">
          <CourseDetail termCode={termCode} course={course} />
        </Link>
      ))}
    </div>
  );
}
