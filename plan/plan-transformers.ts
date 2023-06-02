import { MinimizedCourse, Section } from "@/.data/types";
import { courseToSlug2 } from "@/course";
import { CalendarEvent } from "@/event/types";
import { getMeetingTimeLocation } from "@/section/section";
import { dayNameToNumber } from "@/utils/date/days";
import { stringTimeToTime } from "@/utils/time/time";
import { PlanEvent } from "./types";

export function sectionCourseToCalendarEvents(section: Section, course: MinimizedCourse): CalendarEvent[] {
  const calendarEvents: CalendarEvent[] = [];

  section.meetingTimes.forEach((meetingTime, index) => {
    meetingTime.days.forEach((dayName) => {
      const calendarEvent: CalendarEvent = {
        id: `${section.crn}-${index}`,
        title: courseToSlug2(course),
        subtitle: getMeetingTimeLocation(meetingTime),
        day: dayNameToNumber(dayName),
        startTime: stringTimeToTime(meetingTime.startTime),
        endTime: stringTimeToTime(meetingTime.endTime),
      };
      calendarEvents.push(calendarEvent);
    });
  });

  return calendarEvents;
}

// export function coursePlanEventToCalendarEvents(planEvent: CoursePlanEvent, section: Section): CalendarEvent[] {
// return sectionCourseToCalendarEvents({section.crn})
// const calendarEvents: CalendarEvent[] = [];

// section.meetingTimes.forEach((meetingTime, index) => {
//   meetingTime.days.forEach((dayName) => {
//     const calendarEvent: CalendarEvent = {
//       id: `${section.crn}-${index}`,
//       title: courseToSlug2(planEvent.minimizedCourse),
//       subtitle: getMeetingTimeLocation(meetingTime),
//       day: dayNameToNumber(dayName),
//       startTime: stringTimeToTime(meetingTime.startTime),
//       endTime: stringTimeToTime(meetingTime.endTime),
//     };
//     calendarEvents.push(calendarEvent);
//   });
// });

// return calendarEvents;
// }
