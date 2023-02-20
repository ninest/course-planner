import { usePlans } from "@/hooks/use-plans";
import { CourseSearch } from "./course-search";

interface PlannerProps {
  id: string;
}
export const Planner = ({ id }: PlannerProps) => {
  const { planById } = usePlans();
  const plan = planById(id);

  return (
    <div>
      <div>
        <h2 className="text-xl font-bold">{plan?.name}</h2>
        <p className="mt-1 text-gray-700">{plan?.description}</p>
      </div>
      <div className="mt-3">
        <CourseSearch />
      </div>
    </div>
  );
};
