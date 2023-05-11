import { AddEventToPlanParams, CreatePlanParams, DeletePlanParams, EditPlanParams, Plan } from "../../../app/plan/types";

export interface PlanHook {
  plans: Plan[];
  createPlan(params: CreatePlanParams): Promise<Plan>;
  deletePlan(params: DeletePlanParams): Promise<void>;
  editPlan(params: EditPlanParams): Promise<void>;
  addEventToPlan(params: AddEventToPlanParams): Promise<void>;
}
