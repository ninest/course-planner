import { WeekView } from "@/components/week-view/week-view";
import { usePlan } from "../../../../plan/hooks";
import { useWeekView } from "@/hooks/use-week-view";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
  if (!plan) return <div className="p-3">Invalid plan!</div>;

  return (
    <div className="p-3">
      <WeekView events={[...previewEvents.map((event) => ({ ...event, possible: true }))]} />
    </div>
  );
}
