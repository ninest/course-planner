import { Course, Section } from "@/.data/types";
import { courseShortTitle } from "@/utils/course/course";
import { dayToNumber } from "@/utils/date/days";
import { eventColorKeys } from "@/utils/event/colors";
import { CoursePlan } from "@/utils/plan/types";
import { randomFromList } from "@/utils/random";
import { stringTimeToTime } from "@/utils/time/time";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { nanoid } from "nanoid";

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
    const newPlanId = nanoid();
    setPlans((plans) => [
      ...plans,
      { id: newPlanId, termCode, name, description, events: [] },
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

  const addCourseToPlan = (
    planId: string,
    course: Course,
    section: Section
  ) => {
    const currentPlanIndex = plans.findIndex((p) => p.id === planId);
    if (currentPlanIndex === -1) return;

    const currentPlan = plans[currentPlanIndex];
    const newPlans = [...plans];

    // @ts-ignore "as const" causing issues for list
    const randomColorKey = randomFromList(eventColorKeys);

    section.days.forEach((day) => {
      const dayNum = dayToNumber(day);
      const startTime = stringTimeToTime(section.startTime);
      const endTime = stringTimeToTime(section.endTime);

      console.log(randomColorKey);

      currentPlan.events.push({
        id: section.crn,
        title: courseShortTitle(course),
        subtitle: course.title,
        day: dayNum,
        startTime,
        endTime,
        color: randomColorKey,
      });
    });

    newPlans[currentPlanIndex] = currentPlan;
    setPlans(newPlans);
  };

  const removeCourseFromPlan = (planId: string, crn: string) => {
    const currentPlanIndex = plans.findIndex((p) => p.id === planId);
    if (currentPlanIndex === -1) return;

    const currentPlan = plans[currentPlanIndex];
    const newPlans = [...plans];

    currentPlan.events = currentPlan.events.filter((e) => e.id !== crn);
    newPlans[currentPlanIndex] = currentPlan;
    setPlans(newPlans);
  };

  const sectionInPlan = (planId: string, crn: string) => {
    const currentPlan = plans.find((p) => p.id === planId);
    if (!currentPlan) return false;

    return currentPlan.events.some((event) => event.id === crn);
  };

  const savePlan = (id: string, plan: CoursePlan) => {
    const existingPlanIndex = plans.findIndex((plan) => plan.id === id);
    if (!existingPlanIndex) return;
    const newPlan: CoursePlan = { ...plans[existingPlanIndex], ...plan };
    const newPlans = [...plans];
    newPlans[existingPlanIndex] = newPlan;
    setPlans(newPlans);
  };

  return {
    plans,
    plansForTerm,
    createPlan,
    validPlanName,
    planById,
    addCourseToPlan,
    removeCourseFromPlan,
    sectionInPlan,
  };
};
