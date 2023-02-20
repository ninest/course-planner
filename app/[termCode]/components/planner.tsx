import { usePlans } from "@/hooks/use-plans";
import { CourseSearch } from "./course-search";

interface PlannerProps {
  id: string;
}
export const Planner = ({ id }: PlannerProps) => {
  const { planById } = usePlans();
  const plan = planById(id);
  if (!plan) throw Error("Invalid plan");

  return (
    <div>
      <div className="flex">
        <div className="md:border-r md:w-[350px]">
          <CourseSearch termCode={plan.termCode} />
        </div>
        <div className="p-5">Hello</div>
      </div>
    </div>
  );
};
