import { CoursePlan } from "@/utils/plan/types";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const plansAtom = atomWithStorage<CoursePlan[]>("plans", []);

export const usePlans = () => {
  const [plans, setPlans] = useAtom(plansAtom);

  const plansForTerm = (termCode: string) =>
    plans.filter((plan) => plan.termCode === termCode);

  const createPlan = (termCode: string, name: string) =>
    setPlans((plans) => [...plans, { termCode, name, courses: [] }]);

  return { plansForTerm, createPlan };
};
