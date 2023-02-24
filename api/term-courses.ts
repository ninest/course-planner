import { TermSubjectCourseMapping } from "@/.data/types";

export const getTermCourses = async (
  termCode: string
): Promise<TermSubjectCourseMapping> => {
  const response = await fetch(
    `https://nu-courses.deno.dev/mapping/term-courses/${termCode}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok)
    throw new Error(`Error in fetching term course mapping ${termCode}`);

  const receivedData = await response.json();
  return receivedData.data;
};
