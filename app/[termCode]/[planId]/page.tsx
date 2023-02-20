"use client"

import { usePlans } from "@/hooks/use-plans";
import { CoursePlan } from "@/utils/plan/types";
import { useEffect, useState } from "react";
import { CourseSearch } from "../components/course-search";

interface PlanPageProps {
  params: { planId: string };
}

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
      <>
        <CourseSearch termCode={currentPlan?.termCode} />
      </>
    )
  );
}
