import { Term } from "@/.data/types";
import { Plan } from "@/plan/types";

export function planById(plans: Plan[], planId: string) {
  return plans.find((plan) => plan.id === planId);
}

export function plansForTerm(plans: Plan[], term: Term) {
  return plans.filter((plan) => plan.termCode === term.code);
}

export function sectionInPlan(plan: Plan, crn: string) {
  return plan.events.some((planEvent) => planEvent.id === crn);
}
