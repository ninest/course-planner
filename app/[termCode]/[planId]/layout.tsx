"use client";

import { WeekView } from "@/components/week-view/week-view";
import { usePlans } from "@/hooks/use-plans";
import { useWeekView } from "@/hooks/use-week-view";
import { CoursePlan } from "@/utils/plan/types";
import { ReactNode, useEffect, useState } from "react";

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

  const { previewEvents } = useWeekView();

  return (
    currentPlan && (
      <div className="flex flex-col-reverse md:flex-row">
        <div className="border-t md:border-t-0 md:border-r md:w-[450px]">
          <div className="relative md:h-[calc(100vh-5rem)] overflow-y-scroll">
            {children}
          </div>
        </div>
        <div className="p-5 md:w-[calc(100vw-450px)]">
          <WeekView events={[...previewEvents]} />
        </div>
      </div>
    )
  );
}
