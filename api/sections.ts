import { Section } from "@/.data/types";

export const getSectionsForCourse = async (
  termCode: string,
  subjectCode: string,
  courseNumber: string
) => {
  const response = await fetch(
    `https://nu-courses.deno.dev/sections/${termCode}/${subjectCode}/${courseNumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok)
    throw new Error(
      `Error in fetching sections for term ${termCode}/${subjectCode}${courseNumber}`
    );

  const receivedData: (Section | null)[] = await response.json();
  return receivedData;
};
