import { MeetingTime, Section } from "@/.data/types";

export const getMeetingTimeLocation = (meetingTime: MeetingTime) => {
  return meetingTime.online ? "Online" : `${meetingTime.building.description} ${meetingTime.building.room}`;
};

export const getSectionProfessors = (section: Section) =>
  section.meetingTimes[0].faculty.map((professor) => professor.name).join("; ");
