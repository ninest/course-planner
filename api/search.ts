import { SearchGroup } from "@/.data/types";

export async function searchCourses(searchGroups: SearchGroup[]) {
  const response = await fetch(
    `https://nu-courses.deno.dev/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchGroups)
    }
  );

}
