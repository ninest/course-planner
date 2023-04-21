import { Subject } from "@/.data/types";

export async function getSubjects() {
  const response = await fetch(`https://nu-courses.deno.dev/subjects`);
  if (!response.ok) throw new Error(`Error in fetching all subjects`);

  const receivedData: Subject[] = await response.json();
  return receivedData;
}
