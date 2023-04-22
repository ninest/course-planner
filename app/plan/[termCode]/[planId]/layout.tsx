"use client";

import { WeekView } from "@/components/week-view/week-view";
import { usePlans } from "@/hooks/use-plans";
import { useWeekView } from "@/hooks/use-week-view";
import { CalendarEvent } from "@/utils/event/types";
import { getPlanTimedEvents } from "@/utils/plan/functions";
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

  const { previewEvents, sectionsInPlanPreview } = useWeekView();

  // const events: CalendarEvent[] = [
  //   ...(currentPlan?.items
  //     .filter(
  //       (item): item is CourseSectionCalendarEvent =>
  //         item.type === "course-section"
  //     )
  //     .map((item) => {
  //       return item.section.days.map((day) => ({
  //         id: item.section.crn,
  //         day: dayToNumber(day),
  //         startTime: stringTimeToTime(item.section.startTime),
  //         endTime: stringTimeToTime(item.section.endTime),
  //         title: courseShortTitle(item.course),
  //         subtitle: sectionLocation(item.section),
  //         color: item.color,
  //         possible: sectionsInPlanPreview.includes(item.section.crn),
  //       }));
  //     })
  //     .flat() ?? []),
  // ];
  const events: CalendarEvent[] = getPlanTimedEvents(currentPlan!).map(
    (event) => ({
      ...event,
      possible: sectionsInPlanPreview.includes(event.id),
    })
  );

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
            "md:overflow-y-scroll", // Disabled on mobile because it affects sticky
            // Mobile: max height to prevent bottom sheet from going too high
            "h-[75vh] overflow-y-hidden md:h-full md:border-r"
          )}
        >
          <aside className="bg-white md:border-t-0 md:h-full">
            {/* Mobile top border */}
            <div className="h-7 md:hidden rounded-t-lg md:rounded-t-0 border-t md:border-t-0">
              {/* Mobile: rounded top and "pill" to show it is a bottom sheet */}
              <div className="h-7 md:hidden flex justify-center items-center">
                <div className="h-1 w-7 bg-gray-300 rounded-full" />
              </div>
            </div>
            <div className="overflow-y-scroll md:overflow-y-visible h-[calc(75vh-1.25rem)] pb-[30vh]">
              {children}
            </div>
          </aside>
        </div>
        <div
          className={clsx(
            "p-5",
            "md:w-[calc(100vw-350px)] lg:w-[calc(100vw-450px)]",
            "overflow-y-scroll",
            // Mobile: top should be planner header's mobile height
            "sticky top-[6rem] h-[40vh] md:top-auto md:h-auto",
            // Extra height below
            "pb-[50vh]"
          )}
        >
          <WeekView events={[...previewEvents, ...events]} />
        </div>
      </div>
    )
  );
}
