export interface SearchGroup {
  subjectCode?: string,
  courseNumber?: string
}

interface GetSearchGroupsParams {
  query: string
  subjectCodes: string[]
}
interface GetSearchGroupsResult {
  value: string
  searchGroups: SearchGroup[]
}

export function getSearchGroups({ query, subjectCodes }: GetSearchGroupsParams): GetSearchGroupsResult {
  const parts = query.split(",").map(part => part.trim())

  const textGroups: string[] = []
  const searchGroups: SearchGroup[] = []

  parts.forEach(part => {
    let newPart: null | string = null;
    const searchGroup: SearchGroup = {}
    subjectCodes.forEach(code => {
      if (part.toLowerCase().startsWith(code.toLowerCase())) {
        newPart = part.toUpperCase()
        searchGroup.subjectCode = code
        searchGroup.courseNumber = part.replaceAll(code, '')
      }
    })
    if (newPart === null) newPart = part
    textGroups.push(newPart)
    searchGroups.push(searchGroup)
  })

  const value = textGroups.join(",")
  return { searchGroups, value }
}