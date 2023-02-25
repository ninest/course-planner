import { getSubjectsForTerm } from "@/api/courses";
import { getTermCourses } from "@/api/term-courses";
import { CourseSearch } from "./course-search";

interface PlanPageProps {
  params: { termCode: string; planId: string };
}

/* 
This page only contains the course search, not the actual planner. The planner is in the layout
*/
export default async function PlanPage({ params }: PlanPageProps) {
  const { planId, termCode } = params;
  const subjectsWithCounts = await getSubjectsForTerm(termCode);

  return (
    <div className="p-5">
      <CourseSearch
        termCode={termCode}
        subjectsWithCounts={subjectsWithCounts}
        planId={planId}
      />
    </div>
  );
}
