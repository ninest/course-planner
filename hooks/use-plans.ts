import { CoursePlan } from "@/utils/plan/types";
import { atom, useAtom } from "jotai";
import { withImmer } from "jotai-immer";
import { atomWithStorage } from "jotai/utils";

const plansAtom = atomWithStorage<CoursePlan[]>("plans", []);

export const usePlans = () => {
  const [plans, setPlans] = useAtom(plansAtom);

  const plansForTerm = (termCode: string) =>
    plans.filter((plan) => plan.termCode === termCode);

  const createPlan = (
    termCode: string,
    name: string,
    description: string = ""
  ) => {
    const newPlanId = `${termCode}-${name.replaceAll(" ", "-")}`; // TODO: better Ids
    setPlans((plans) => [
      ...plans,
      { id: newPlanId, termCode, name, description, courses: [] },
    ]);
    return newPlanId;
  };

  const validPlanName = (termCode: string, name: string) => {
    const existingPlan = plans.find(
      (plan) => plan.name === name && plan.termCode === termCode
    );

    return !!!existingPlan;
  };

  const planById = (id: string) => plans.find((plan) => plan.id === id);

  const savePlan = (id: string, plan: CoursePlan) => {
    const existingPlanIndex = plans.findIndex((plan) => plan.id === id);
    if (!existingPlanIndex) return;
    const newPlan: CoursePlan = { ...plans[existingPlanIndex], ...plan };
    const newPlans = [...plans];
    newPlans[existingPlanIndex] = newPlan;
    setPlans(newPlans);
  };

  return { plans, plansForTerm, createPlan, validPlanName, planById, savePlan };
};
