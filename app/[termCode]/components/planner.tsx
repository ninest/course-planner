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
      {/* <div>
        <h2 className="text-xl font-bold">{plan?.name}</h2>
        <p className="mt-1 text-gray-700">{plan?.description}</p>
      </div> */}
      <div className="flex">
        <div className="p-5 md:border-r md:w-[350px] md:h-screen">
          <CourseSearch termCode={plan.termCode} />
        </div>
        <div></div>
      </div>
    </div>
  );
};
