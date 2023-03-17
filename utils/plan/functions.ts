import { Course, Section } from "@/.data/types";
import { nanoid } from "nanoid";
import { courseShortTitle } from "../course/course";
import { courseContainsSection } from "../course/functions";
import { dayToNumber } from "../date/days";
import { CalendarEvent } from "../event/types";
import { getSectionLocation } from "../section/section";
import { stringTimeToTime } from "../time/time";
import {
  AsyncOnlineSectionCalendarEvent,
  CoursePlan,
  CourseSectionCalendarEvent,
} from "./types";

// Create a new plan
interface NewPlanParams {
  termCode: string;
  name: string;
  description: string;
}
export const newPlan = (params: NewPlanParams): CoursePlan => {
  const newPlanId = nanoid();
  return {
    id: newPlanId,
    termCode: params.termCode,
    name: params.name,
    description: params.description,
    items: [],
  };
};

// Get all events that have a time and can be displayed on a calendar
export const getPlanTimedEvents = (plan: CoursePlan): CalendarEvent[] => {
  return (
    plan?.items
      .filter(
        (item): item is CourseSectionCalendarEvent =>
          item.type === "course-section"
      )
      .map((item) => {
        return item.section.days.map((day) => ({
          id: item.section.crn,
          day: dayToNumber(day),
          startTime: stringTimeToTime(item.section.startTime),
          endTime: stringTimeToTime(item.section.endTime),
          title: courseShortTitle(item.course),
          subtitle: getSectionLocation(item.section),
          color: item.color,
        }));
      })
      .flat() ?? []
  );
};

export const getPlanSectionCrns = (plan: CoursePlan): string[] => {
  return plan.items
    .filter(
      (
        planItem
      ): planItem is
        | CourseSectionCalendarEvent
        | AsyncOnlineSectionCalendarEvent =>
        planItem.type === "async-online-course-section" ||
        planItem.type === "course-section"
    )
    .map((courseItem) => courseItem.section.crn);
};

export const getPlanCourses = (plan: CoursePlan): Course[] => {
  return plan.items
    .filter(
      (
        planItem
      ): planItem is
        | CourseSectionCalendarEvent
        | AsyncOnlineSectionCalendarEvent =>
        planItem.type === "async-online-course-section" ||
        planItem.type === "course-section"
    )
    .map((courseItem) => courseItem.course);
};

export const getPlanCourseSectionsFromSections = (
  plan: CoursePlan,
  sections: Section[]
): { course: Course; section: Section }[] => {
  const planCourses = getPlanCourses(plan);

  return sections.map((section) => {
    const course = planCourses.find((course) =>
      courseContainsSection(course, section)
    );
    return {
      course: course!,
      section,
    };
  });
};
