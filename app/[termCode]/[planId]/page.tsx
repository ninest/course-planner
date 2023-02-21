"use client";

import { usePlans } from "@/hooks/use-plans";
import { CoursePlan } from "@/utils/plan/types";
import { useEffect, useState } from "react";
import { CourseSearch } from "../components/course-search";

interface PlanPageProps {
  params: { planId: string };
}

/* 
This page only contains the course search, not the actual planner
*/
export default function PlanPage({ params }: PlanPageProps) {
  const { plans, planById } = usePlans();
  const [currentPlan, setCurrentPlan] = useState<CoursePlan | null>(null);

  useEffect(() => {
    const plan = planById(params.planId);
    if (!plan) return;
    setCurrentPlan(plan);
  }, [params.planId, plans]);

  return (
    currentPlan && (
      <div>
        <CourseSearch termCode={currentPlan.termCode} planId={currentPlan.id} />
      </div>
    )
  );
}
