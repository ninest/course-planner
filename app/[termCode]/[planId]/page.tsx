import { getTermCourses } from "@/services/term-courses";
import { CourseSearch } from "../components/course-search";

interface PlanPageProps {
  params: { termCode: string; planId: string };
}

/* 
This page only contains the course search, not the actual planner
*/
export default async function PlanPage({ params }: PlanPageProps) {
  const { planId, termCode } = params;
  // Fetch term mapping
  const termCourses = await getTermCourses(termCode);

  return (
    <div>
      <CourseSearch
        termCode={termCode}
        termCourses={termCourses}
        planId={planId}
      />
    </div>
  );
}
