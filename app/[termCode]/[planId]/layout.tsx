"use client";

import { usePlans } from "@/hooks/use-plans";
import { CoursePlan } from "@/utils/plan/types";
import { ReactNode, useEffect, useState } from "react";
import { CourseSearch } from "../components/course-search";

interface PlanLayoutProps {
  params: { planId: string };
  children: ReactNode;
}

export default function PlanLayout({ params, children }: PlanLayoutProps) {
  const { plans, planById } = usePlans();
  const [currentPlan, setCurrentPlan] = useState<CoursePlan | null>(null);

  useEffect(() => {
    const plan = planById(params.planId);
    if (!plan) return;
    setCurrentPlan(plan);
  }, [params.planId, plans]);

  return (
    currentPlan && (
      <div className="flex">
        <div className="md:border-r md:w-[350px]">
        <div className="relative p-5 lg:h-[calc(100vh-5rem)] overflow-y-scroll">{children}</div>
        </div>
        <div className="p-5">Planner</div>
      </div>
    )
  );
}
