import { SearchGroup } from "@/.data/types";

interface GetSearchGroupsParams {
  query: string;
}
export function getSearchGroups({ query }: GetSearchGroupsParams): SearchGroup[] /* GetSearchGroupsResult */ {
  const parts = query.split(",").map((part) => part.trim());

  const searchGroups: SearchGroup[] = [];

  parts.forEach((part) => {
    // let newPart: null | string = null;
    let searchGroup: SearchGroup | null = null;

    // Check if subject code
    // Subject code can be 2 to 5 letters
    const lettersRe = /^([A-Za-z]{2,5})$/;
    const subjectMatch = part.match(lettersRe);
    if (subjectMatch) {
      const subjectCode = subjectMatch[1].toUpperCase();
      searchGroup = { type: "subject", subjectCode };
    }

    // Check if subject code and number (ex. `CS3400` or `CS 3400`)
    const lettersThenNumbersRe = /^([A-Za-z]{2,5})\s?(\d+)$/;
    const courseMatch = part.match(lettersThenNumbersRe);
    if (courseMatch) {
      // newPart = part.toUpperCase();

      const subjectCode = courseMatch[1].toUpperCase();
      const courseNumber = courseMatch[2];
      searchGroup = {
        type: "course",
        subjectCode,
        courseNumber,
      };
    }

    // Check if CRN: exactly 5 digits
    // ignore spaces at start/end
    const crnRe = /^\s*\d{5}\s*$/;
    if (crnRe.test(part)) {
      searchGroup = {
        type: "crn",
        crn: part,
      };
    }

    if (searchGroup) searchGroups.push(searchGroup);
  });

  // const value = textGroups.join(",");
  return searchGroups; //{ searchGroups, value };
}

// Convert searchGroups to the string search query used to get these searchGroups
export function searchGroupsToQuery(searchGroups: SearchGroup[]) {
  const searchQueryItems: string[] = [];
  searchGroups.forEach((group) => {
    if (group.type === "course") searchQueryItems.push(`${group.subjectCode} ${group.courseNumber}`);
    else if (group.type === "subject") searchQueryItems.push(`${group.subjectCode}`);
    else if (group.type === "crn") searchQueryItems.push(`${group.crn}`);
  });
  return searchQueryItems.join(", ");
}