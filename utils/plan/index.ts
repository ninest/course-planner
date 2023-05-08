import { Term } from "@/.data/types";
import { Plan } from "@/app/plan/types";

export function plansForTerm(plans: Plan[], term: Term) {
  return plans.filter((plan) => plan.termCode === term.code);
}
