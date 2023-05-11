import { Term } from "@/.data/types";
import { Plan } from "@/plan/types";

export function plansForTerm(plans: Plan[], term: Term) {
  return plans.filter((plan) => plan.termCode === term.code);
}
