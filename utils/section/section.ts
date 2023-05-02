import { Section } from "@/.data/types";

export const getSectionLocation = (section: Section) => {
  return "TODO: "
  // return section.online
  //   ? "Online"
  //   : `${section.building.description} ${section.building.room}`;
};


export const getSectionProfessors = (section: Section) =>
  section.meetingTimes[0].faculty.map((professor) => professor.name).join("; ");
