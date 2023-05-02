import { Course, Section } from "@/.data/types";
import { availableColorKeys } from "@/utils/event/colors";
import { newPlan } from "@/utils/plan/functions";
import {
  CoursePlan
} from "@/utils/plan/types";
import { randomFromList } from "@/utils/random";
import { useAtom } from "jotai";
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
    const plan = newPlan({ termCode, name, description });
    setPlans((plans) => [...plans, plan]);
    return plan.id;
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

    const randomColorKey = randomFromList(availableColorKeys);

    // Async online courses
    // TODO: fix
    // if (section.online && section.days.length == 0) {
    //   currentPlan.items.push({
    //     type: "async-online-course-section",
    //     id: section.crn,
    //     color: randomColorKey,
    //     course,
    //     section,
    //   });
    // } else {
    //   currentPlan.items.push({
    //     type: "course-section",
    //     id: section.crn,
    //     color: randomColorKey,
    //     course,
    //     section,
    //   });
    // }

    newPlans[currentPlanIndex] = currentPlan;
    setPlans(newPlans);
  };

  const removeCourseFromPlan = (planId: string, crn: string) => {
    const currentPlanIndex = plans.findIndex((p) => p.id === planId);
    if (currentPlanIndex === -1) return;

    const currentPlan = plans[currentPlanIndex];
    const newPlans = [...plans];

    currentPlan.items = currentPlan.items.filter((event) => event.id !== crn);
    newPlans[currentPlanIndex] = currentPlan;
    setPlans(newPlans);
  };

  const courseInPlan = (
    planId: string,
    subjectCode: string,
    courseNumber: string
  ) => {
    const currentPlan = plans.find((p) => p.id === planId);
    if (!currentPlan) return false;

    return currentPlan.items.some(
      (event) =>
        (event.type === "course-section" ||
          event.type === "async-online-course-section") &&
        event.course.subject === subjectCode &&
        event.course.number === courseNumber
    );
  };

  const sectionInPlan = (planId: string, crn: string) => {
    const currentPlan = plans.find((p) => p.id === planId);
    if (!currentPlan) return false;

    return currentPlan.items.some(
      (event) =>
        (event.type === "course-section" ||
          event.type === "async-online-course-section") &&
        event.id === crn
    );
  };

  const numMySections = (planId: string) => {
    const plan = planById(planId);
    return plan?.items.length ?? 0;
  };

  return {
    plans,
    plansForTerm,
    createPlan,
    validPlanName,
    planById,
    addCourseToPlan,
    removeCourseFromPlan,
    courseInPlan,
    sectionInPlan,
    numMySections,
  };
};
