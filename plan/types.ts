import { MinimizedCourse } from "@/.data/types";

export interface Plan {
  id: string;
  termCode: string;
  name: string;
  description?: string;
  events: PlanEvent[];
}

export type PlanEvent = CoursePlanEvent;
export interface CoursePlanEvent {
  type: "course";
  crn: string;
  minimizedCourse: MinimizedCourse;
}

export interface CreatePlanParams {
  name: string;
  termCode: string;
  description?: string;
}

export interface DeletePlanParams {
  id: string;
}

export interface EditPlanParams extends Partial<Plan> {}

export interface AddEventToPlanParams {
  id: string;
  event: PlanEvent;
}
