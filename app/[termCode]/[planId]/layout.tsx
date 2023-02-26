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
      // <div className="flex flex-col-reverse md:flex-row">
      //   <div className="border-t md:border-t-0 md:border-r md:w-[350px] lg:w-[350px]">
      //     <div className="relative bg-white z-50 md:h-[calc(100vh-5rem)] overflow-y-scroll">
      //       {children}
      //     </div>
      //   </div>
      //   <div className="p-5 sticky top-[6rem] h-[70vh] md:top-auto overflow-y-scroll md:pb-[75vh] md:w-[calc(100vw-350px)] lg:w-[calc(100vw-450px)] md:h-[calc(100vh-10rem)]">
      //     <WeekView events={[...previewEvents]} />
      //   </div>
      // </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div
          className={clsx(
            "md:w-[350px] lg:w-[450px] z-10",
            // height is 100% - height of planner header
            "md:h-[calc(100vh-4rem)] overflow-y-scroll"
          )}
        >
          <aside className="h-full rounded-t-lg bg-white border-t md:border-t-0 md:border-r">
            {/* Mobile: rounded top and "pill" to show it is a bottom sheet */}
            <div className="md:hidden flex justify-center items-center mt-3">
              <div className="h-1 w-7 bg-gray-300 rounded-full" />
            </div>
            <div className="pt-3 py-5">{children}</div>
          </aside>
        </div>
        <div
          className={clsx(
            "p-5",
            "md:w-[calc(100vw-350px)] lg:w-[calc(100vw-450px)]",
            // height is 100% - height of planner header
            "md:h-[calc(100vh-4rem)] overflow-y-scroll",
            // Mobile: top should be planner header's mobile height
            "sticky top-[6rem] h-[70vh] md:top-auto md:h-auto"
          )}
        >
          <WeekView events={[...previewEvents]} />
        </div>
      </div>
    )
  );
}
