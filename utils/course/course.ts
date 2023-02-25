export const courseToSlug = (courseSubjectNumber: string) => {
  return courseSubjectNumber.toUpperCase().replace(" ", "-");
};

export const slugToCourse = (slug: string) => {
  const subject = slug.split("-")[0].toUpperCase();
  const number = slug.split("-")[1];
  return { subject, number };
};

export const courseDescriptionToList = (description: string) => {
  // https://stackoverflow.com/a/18914855/8677167
  return description.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
};

// 0805 to 08:00
export const stringTimeToTime = (stringTime: string) => {
  return stringTime.substring(0, 2) + ":" + stringTime.substring(2, 4);
};
