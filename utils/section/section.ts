import { Section } from "@/.data/types";

export const getSectionLocation = (section: Section) => {
  return section.online
    ? "Online"
    : `${section.building.description} ${section.building.room}`;
};


export const getSectionProfessors = (section: Section) =>
  section.faculty.map((professor) => professor.name).join("; ");
