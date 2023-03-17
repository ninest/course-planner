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

export const getMultipleSections = async (termCode: string, crns: string[]) => {
  const queryParams = new URLSearchParams();
  crns.forEach((crn) => queryParams.append("crn", crn));

  const response = await fetch(
    `https://nu-courses.deno.dev/sections/${termCode}?` + queryParams.toString(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok)
    throw new Error(
      `Error in fetching sections for term ${termCode} and CRNs ${crns}`
    );

  const receivedData: (Section | null)[] = await response.json();
  return receivedData;
};
