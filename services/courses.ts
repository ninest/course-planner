import { Course, TermSubjectCourseMapping } from "@/.data/types";

export const getCourse = async (
  subjectCode: string,
  courseNumber: string
): Promise<Course> => {
  const response = await fetch(
    `https://nu-courses.deno.dev/courses/${subjectCode}/${courseNumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok)
    throw new Error(`Error in fetching course ${subjectCode} ${courseNumber}`);

  const receivedData = await response.json();
  return receivedData.data;
};
