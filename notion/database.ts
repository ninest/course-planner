import { MinimizedCourse } from "@/.data/types";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const courseDatabaseId = "efa10c1e8f5e432aa0e393b435c68a67";

export async function getCoursesDatabase() {
  const response = await notion.databases.retrieve({ database_id: courseDatabaseId });
  return response;
}

export async function queryCourseDatabase(course: MinimizedCourse) {
  const response = await notion.databases.query({
    database_id: courseDatabaseId,
    filter: {
      and: [
        {
          property: "Subject",
          rich_text: {
            equals: course.subject,
          },
        },
        {
          property: "Number",
          rich_text: {
            equals: course.subject,
          },
        },
      ],
    },
  });

  return response;
}
