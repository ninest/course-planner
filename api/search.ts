import { Course, SearchGroup } from "@/.data/types";

export async function searchCourses(searchGroups: SearchGroup[]) {
  const response = await fetch(`https://nu-courses.deno.dev/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(searchGroups),
  });

  if (!response.ok) throw new Error(`Unable to search courses with query ${searchGroups}`);

  const receivedData: Course[] = await response.json();
  return receivedData;
}
