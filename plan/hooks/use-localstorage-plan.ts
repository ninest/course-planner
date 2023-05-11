import produce from "immer";
import { useAtom } from "jotai";
import { withImmer } from "jotai-immer";
import { atomWithStorage } from "jotai/utils";
import { nanoid } from "nanoid";
import { AddEventToPlanParams, CreatePlanParams, DeletePlanParams, EditPlanParams, Plan } from "../../../app/plan/types";
import { PlanHook } from "./types";

const plansAtom = atomWithStorage<Plan[]>("plans", []);

export function useLocalStoragePlan(): PlanHook {
  const [plans, setPlans] = useAtom(plansAtom);

  const createPlan = async (params: CreatePlanParams) => {
    const newPlan: Plan = {
      id: nanoid(),
      name: params.name,
      termCode: params.termCode,
      description: params.description,
      events: [],
    };
    const newPlans = [...plans, newPlan];
    setPlans(newPlans);
    return newPlan;
  };

  const deletePlan = async (params: DeletePlanParams) => {
    const index = plans.findIndex((plan) => plan.id === params.id);
    if (index === -1) throw new Error("Unable to delete invalid plan");

    const newPlans = [...plans];
    delete newPlans[index];
    setPlans(newPlans);
  };

  const editPlan = async (params: EditPlanParams) => {
    const index = plans.findIndex((plan) => plan.id === params.id);
    if (index === -1) throw new Error("Unable to edit invalid plan");

    const editedPlan = { ...plans[index], ...params };
    const newPlans = [...plans];
    newPlans[index] = editedPlan;
    setPlans(newPlans);
  };

  const addEventToPlan = async (params: AddEventToPlanParams) => {
    const index = plans.findIndex((plan) => plan.id === params.id);
    if (index === -1) throw new Error("Unable to add event to invalid plan");

    const newPlans = [...plans];
    newPlans[index].events.push(params.event);
    setPlans(newPlans);
  };

  return { plans, createPlan, deletePlan, editPlan, addEventToPlan };
}
