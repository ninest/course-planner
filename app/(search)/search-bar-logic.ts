type SubjectGroup = {subjectCode:string}
type CourseGroup = {subjectCode:string, courseNumber:string}
type CRNGroup = {crn:string}
export type SearchGroup = SubjectGroup|CourseGroup|CRNGroup
// export interface SearchGroup {
//   subjectCode?: string;
//   courseNumber?: string;
// }

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
    let searchGroup: SearchGroup|null = null;

    // Check if subject code and number (ex. `CS3400`)
    subjectCodes.forEach((code) => {
      if (part.toLowerCase().startsWith(code.toLowerCase())) {
        newPart = part.toUpperCase();
        // searchGroup.subjectCode = code;
        // searchGroup.courseNumber = part.replaceAll(code, "");
        searchGroup = {
subjectCode:code    ,
courseNumber : part.replaceAll(code, "")
        }
      }
    });
    // Check if CRN
    const maybeCrn = parseInt(part.trim());
    if (!Number.isNaN(maybeCrn)) {
      console.log("s number");
      searchGroup = {
        crn: maybeCrn
      }
    }

    if (newPart === null) newPart = part;
    textGroups.push(newPart);
    searchGroups.push(searchGroup);
  });

  const value = textGroups.join(",");
  return { searchGroups, value };
}
