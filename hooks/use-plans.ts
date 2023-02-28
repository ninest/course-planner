import { Course, Section } from "@/.data/types";
import { courseShortTitle } from "@/utils/course/course";
import { dayToNumber } from "@/utils/date/days";
import { availableColorKeys, eventColorKeys } from "@/utils/event/colors";
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
      { id: newPlanId, termCode, name, description, items: [] },
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

    console.log(planId, course, section);

    const currentPlan = plans[currentPlanIndex];
    const newPlans = [...plans];

    const randomColorKey = randomFromList(availableColorKeys);

    // Async online courses
    if (section.online && section.days.length == 0) {
      currentPlan.items.push({
        type: "async-online-course-section",
        id: section.crn,
        title: courseShortTitle(course),
        subtitle: course.title,
        color: randomColorKey,
        course,
        section,
      });
    } else {
      section.days.forEach((day) => {
        const dayNum = dayToNumber(day);
        const startTime = stringTimeToTime(section.startTime);
        const endTime = stringTimeToTime(section.endTime);

        currentPlan.items.push({
          type: "course-section",
          id: section.crn,
          title: courseShortTitle(course),
          subtitle: course.title,
          day: dayNum,
          startTime,
          endTime,
          color: randomColorKey,
          course,
          section,
        });
      });
    }

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
    courseInPlan,
    sectionInPlan,
  };
};
