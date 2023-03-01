import { Section } from "@/.data/types";

export const sectionLocation = (section: Section) => {
  return section.online
    ? "Online"
    : `${section.building.description} ${section.building.room}`;
};
