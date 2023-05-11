import { CalendarEvent } from "@/event/types";
import { useMultipleSections } from "@/hooks/fetching/use-sections";
import { sectionCourseToCalendarEvents } from "../plan-transformers";
import { Plan } from "../types";

export function useCalendarEventsFromPlan(plan: Plan | undefined) {
  const calendarEvents: CalendarEvent[] = [];

  if (plan) {
    const coursePlanEvents = plan.events.filter((plan) => plan.type === "course");
    const crns = coursePlanEvents.map((plan) => plan.crn);
    const sections = useMultipleSections(crns.map((crn) => ({ termCode: plan.termCode, crn })));

    coursePlanEvents.forEach((coursePlanEvent) => {
      const section = sections.fetchedSections.find((section) => section?.crn === coursePlanEvent.crn);
      if (!section) return;
      const events = sectionCourseToCalendarEvents(section, coursePlanEvent.minimizedCourse);
      events.forEach((event) => calendarEvents.push(event));
    });
  }

  return { calendarEvents };
}
