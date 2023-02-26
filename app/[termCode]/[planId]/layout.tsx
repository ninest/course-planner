"use client";

import { WeekView } from "@/components/week-view/week-view";
import { usePlans } from "@/hooks/use-plans";
import { useWeekView } from "@/hooks/use-week-view";
import { CoursePlan } from "@/utils/plan/types";
import clsx from "clsx";
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
      <div
        className={clsx(
          "flex flex-col-reverse md:flex-row",
          "md:h-[calc(100vh-4rem)]"
        )}
      >
        <div
          className={clsx(
            "md:w-[350px] lg:w-[450px] z-10",
            "overflow-y-scroll"
          )}
        >
          <aside className="rounded-t-lg bg-white border-t md:rounded-t-none md:border-t-0 md:border-r">
            {/* Mobile: rounded top and "pill" to show it is a bottom sheet */}
            <div className="md:hidden flex justify-center items-center mt-3">
              <div className="h-1 w-7 bg-gray-300 rounded-full" />
            </div>
            <div className="pt-3 pb-[70vh]">{children}</div>
          </aside>
        </div>
        <div
          className={clsx(
            "p-5",
            "md:w-[calc(100vw-350px)] lg:w-[calc(100vw-450px)]",
            "overflow-y-scroll",
            // Mobile: top should be planner header's mobile height
            "sticky top-[6rem] h-[70vh] md:top-auto md:h-auto",
            // Extra height below
            "pb-[70vh]"
          )}
        >
          <WeekView events={[...previewEvents]} />
        </div>
      </div>
    )
  );
}
