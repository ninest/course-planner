import { MinimizedCourse } from "@/.data/types";
import { Client } from "@notionhq/client";
import { constants } from "./constants";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getCoursesDatabase() {
  const response = await notion.databases.retrieve({ database_id: constants.COURSE_DATABASE_ID });
  return response;
}

export async function queryCourseDatabase(course: MinimizedCourse) {
  const response = await notion.databases.query({
    database_id: constants.COURSE_DATABASE_ID,
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
          number: {
            equals: parseInt(course.number),
          },
        },
      ],
    },
  });

  return response;
}
