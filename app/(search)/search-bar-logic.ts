import { SearchGroup } from "@/.data/types";

interface GetSearchGroupsParams {
  query: string;
  subjectCodes: string[];
}
interface GetSearchGroupsResult {
  value: string;
  searchGroups: SearchGroup[];
}

export function getSearchGroups({ query, subjectCodes }: GetSearchGroupsParams): GetSearchGroupsResult {
  const parts = query.split(",").map((part) => part.trim());

  const textGroups: string[] = [];
  const searchGroups: SearchGroup[] = [];

  parts.forEach((part) => {
    let newPart: null | string = null;
    let searchGroup: SearchGroup | null = null;

    // Check if subject code and number (ex. `CS3400`)
    subjectCodes.forEach((code) => {
      if (part.toLowerCase().startsWith(code.toLowerCase())) {
        newPart = part.toUpperCase();

        // Check if there's any number in the string
        const hasNumberRe = /\d/;
        if (hasNumberRe.test(part)) {
          searchGroup = {
            type: "course",
            subjectCode: code,
            courseNumber: part.replaceAll(code, ""),
          };
        } else {
          searchGroup = {
            type: "subject",
            subjectCode: code,
          };
        }
      }
    });
    // Check if CRN
    const maybeCrn = parseInt(part.trim());
    if (!Number.isNaN(maybeCrn)) {
      console.log("s number");
      searchGroup = {
        type: "crn",
        crn: maybeCrn.toString(),
      };
    }

    if (newPart === null) newPart = part;
    textGroups.push(newPart);
    if (searchGroup) searchGroups.push(searchGroup);
  });

  const value = textGroups.join(",");
  return { searchGroups, value };
}
