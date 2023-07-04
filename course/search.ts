import { SearchGroup } from "@/.data/types";

interface GetSearchGroupsParams {
  subjectCodes: string[];
  query: string;
}

export function getSearchGroups({ subjectCodes, query }: GetSearchGroupsParams): SearchGroup[] {
  // Remove all periods, slashes, semicolons, other punctuation
  // TODO: use regex?
  const parts = query
    .split(",")
    .map((part) => part.trim().replaceAll(".", "").replaceAll("?", "").replaceAll("/", "").replaceAll(";", ""));

  const searchGroups: SearchGroup[] = [];

  parts.forEach((part) => {
    let searchGroup: SearchGroup | null = null;

    // TODO: auto-correction, perhaps change fundies to fundamentals, pysc to psyc ...

    // SubjectGroup
    // Subject code can be 2 to 5 letters
    const lettersRe = /^([A-Za-z]{2,5})$/;
    const subjectMatch = part.match(lettersRe);
    if (subjectMatch) {
      const subjectCode = subjectMatch[1].toUpperCase();
      const validSubjectCode = subjectCodes.includes(subjectCode);
      if (validSubjectCode) {
        searchGroup = { type: "subject", subjectCode };
        searchGroups.push(searchGroup);
        return;
      }
    }

    // CourseGroup
    // Check if subject code and number (ex. `CS3400` or `CS 3400`)
    // TODO: allow for multiple spaces between subject code and number
    const lettersThenNumbersRe = /^([A-Za-z]{2,5})\s?(\d+)$/;
    const courseMatch = part.match(lettersThenNumbersRe);
    if (courseMatch) {
      const subjectCode = courseMatch[1].toUpperCase();
      const validSubjectCode = subjectCodes.includes(subjectCode);
      if (validSubjectCode) {
        const courseNumber = courseMatch[2];
        searchGroup = {
          type: "course",
          subjectCode,
          courseNumber,
        };
        searchGroups.push(searchGroup);
        return;
        return;
      }
    }

    // SubjectQueryGroup
    // Check if subject code followed by query
    // Example "CS fundamentals", "CS datab"
    const subjectThenQueryRe = /^(\w{2,5})\s(.*)/;
    const subjectQueryMatch = part.match(subjectThenQueryRe);
    if (subjectQueryMatch) {
      const subjectCode = subjectQueryMatch[1].toUpperCase();
      const validSubjectCode = subjectCodes.includes(subjectCode);
      if (validSubjectCode) {
        const query = subjectQueryMatch[2];
        searchGroup = { type: "subject-query", subjectCode, query };
        searchGroups.push(searchGroup);
        return;
      }
    }

    // NumberGroup
    // Either 1 to 4 numbers, not more
    const courseNumberRe = /^\d{1,4}(?!\d)$/;
    const courseNumberMatch = part.match(courseNumberRe);
    if (courseNumberMatch) {
      const courseNumber = courseNumberMatch[0];
      searchGroup = {
        type: "number",
        courseNumber,
      };
      searchGroups.push(searchGroup);
      return;
    }

    // CRNGroup
    // Check if CRN: exactly 5 digits
    // ignore spaces at start/end
    const crnRe = /^\s*\d{5}\s*$/;
    if (crnRe.test(part)) {
      searchGroup = {
        type: "crn",
        crn: part,
      };
      searchGroups.push(searchGroup);
      return;
    }

    // QueryGroup
    // Everything else is a query group
    searchGroup = {
      type: "query",
      query: part,
    };
    searchGroups.push(searchGroup);
  });

  return searchGroups;
}

// Convert searchGroups to the string search query used to get these searchGroups
export function searchGroupsToQuery(searchGroups: SearchGroup[]) {
  const searchQueryItems: string[] = [];
  searchGroups.forEach((group) => {
    if (group.type === "course") searchQueryItems.push(`${group.subjectCode} ${group.courseNumber}`);
    else if (group.type === "number") searchQueryItems.push(`${group.courseNumber}`);
    else if (group.type === "subject") searchQueryItems.push(`${group.subjectCode}`);
    else if (group.type === "subject-query") searchQueryItems.push(`${group.subjectCode} ${group.query}`);
    else if (group.type === "crn") searchQueryItems.push(`${group.crn}`);
    else if (group.type === "query") searchQueryItems.push(`${group.query}`);
  });
  return searchQueryItems.join(", ");
}
