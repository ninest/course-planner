import { WeekView } from "@/components/week-view/week-view";
import { usePlan } from "../../../../plan/hooks";
import { useWeekView } from "@/hooks/use-week-view";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCalendarEventsFromPlan } from "@/plan/hooks/use-calendar-events";

interface PlannerProps {
  planId: string;
}

export function Planner({ planId }: PlannerProps) {
  const pathname = usePathname();
  const { plans } = usePlan();
  const { previewEvents, clearPreviewEvents } = useWeekView();

  // Clear events on page change
  useEffect(() => clearPreviewEvents(), [pathname]);

  const plan = plans.find((plan) => plan.id === planId);
  if (!plan) {
    return <div className="p-3">Invalid plan!</div>;
  }
  const { calendarEvents } = useCalendarEventsFromPlan(plan);

  return (
    <div className="p-3">
      <WeekView
        events={[...previewEvents.map((event) => ({ ...event, possible: true })), ...calendarEvents]}
        hrefFn={(calendarEvent) => {
          const planEvent = plan.events.find((planEvent) => calendarEvent.id.startsWith(planEvent.id));

          switch (planEvent?.type) {
            case "course": {
              return `/plan/${plan.termCode}/${plan.id}/${planEvent.minimizedCourse.subject}${planEvent.minimizedCourse.number}#${planEvent.crn}`;
            }
            default: {
              return "/";
            }
          }
        }}
      />
    </div>
  );
}
