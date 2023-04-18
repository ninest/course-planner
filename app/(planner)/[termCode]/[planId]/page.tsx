import { getSubjectsForTerm } from "@/api/courses";
import { CourseSearch } from "./course-search";

export const revalidate = 0; // no cache

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
    <CourseSearch
      termCode={termCode}
      subjectsWithCounts={subjectsWithCounts}
      planId={planId}
    />
  );
}
