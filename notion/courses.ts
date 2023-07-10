import { MinimizedCourse } from "@/.data/types";
import { Client } from "@notionhq/client";
import { constants } from "./constants";
import { queryNotionDatabase, retrieveNotionDatabase } from "@/api/notion";

export async function getCoursesDatabase() {
  const db = await retrieveNotionDatabase(constants.COURSE_DATABASE_ID);
  return db;
}

export async function queryCourseDatabase(course: MinimizedCourse) {
  const response = await queryNotionDatabase(constants.COURSE_DATABASE_ID, {
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
