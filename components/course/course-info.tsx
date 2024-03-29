"use client";

import { Course } from "@/.data/types";
import { courseDescriptionToList } from "@/course";
import { useState } from "react";
import { NUPathTable } from "./nu-path-table";
import { RequisiteDisplay } from "./requisite-display";
import { CourseHrefFn } from "./types";

interface CourseInfoProps {
  course: Course;
  courseHrefFn: CourseHrefFn;
}

export const CourseInfo = ({ course, courseHrefFn }: CourseInfoProps) => {
  const descriptionList = course.description ? courseDescriptionToList(course.description) : [];
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  return (
    <div className="space-y-6">
      {/* Course type, credits */}
      <section className="flex justify-between">
        <div>{course.scheduleType}</div>
        <div>{course.credits} credits</div>
      </section>

      {/* Description */}
      {course.description && (
        <section onClick={() => setDescriptionExpanded((e) => !e)}>
          {descriptionExpanded ? (
            <ul className="list-disc ml-4 text-xs text-gray-600">
              {descriptionList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-600">
              {descriptionList[0]} <i>Show more</i>
            </p>
          )}
        </section>
      )}

      {/* NUPath */}
      {course.nuPath.length > 0 && (
        <section>
          <NUPathTable path={course.nuPath} />
        </section>
      )}
      {/* <span className="text-gray-400 text-sm font-medium">No NUPath covered.</span> */}

      {/* Requisites */}
      <section>
        <RequisiteDisplay coreqs={course.coreqs ?? []} prereqs={course.prereqs ?? []} courseHrefFn={courseHrefFn} />
      </section>
    </div>
  );
};
