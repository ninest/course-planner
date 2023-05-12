import {
  AddEventToPlanParams,
  CreatePlanParams,
  DeletePlanParams,
  EditPlanParams,
  EventInPlanParams,
  Plan,
  RemoveEventFromPlanParams,
} from "../types";

export interface PlanHook {
  plans: Plan[];
  createPlan(params: CreatePlanParams): Promise<Plan>;
  deletePlan(params: DeletePlanParams): Promise<void>;
  editPlan(params: EditPlanParams): Promise<void>;
  addEventToPlan(params: AddEventToPlanParams): Promise<void>;
  removeEventFromPlan(params: RemoveEventFromPlanParams): Promise<void>;
  eventInPlan(params: EventInPlanParams): boolean;
}
