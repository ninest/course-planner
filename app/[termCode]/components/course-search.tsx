"use client";

import { TermSubjectCourseMapping } from "@/.data/types";
import { useFocus } from "@/hooks/util/use-focus";
import { courseToSlug } from "@/utils/course/course";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HTMLAttributes, HTMLProps, useState } from "react";
import allCourses from "../../../.data/all-courses.json";
import subjects from "../../../.data/subjects.json";

interface CourseSearchProps {
  termCode: string;
  termCourses: TermSubjectCourseMapping;
  planId: string;
}

export const CourseSearch = ({
  termCode,
  termCourses,
  planId,
}: CourseSearchProps) => {
  const [query, setQuery] = useState("");
  const filteredSubjects = subjects.filter((subject) =>
    subject.code.includes(query)
  );
  const [maybeSubjectCode, maybeCourseNumber] = query.split(" ");
  const availableCourses = termCourses?.[maybeSubjectCode] ?? [];

  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>();

  return (
    <>
      <fieldset className="sticky top-0">
        <input
          autoFocus
          ref={inputRef}
          className="form-field w-full"
          type="text"
          placeholder="Search courses ..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value.toUpperCase())}
        />
      </fieldset>

      <div className="mt-4">
        {availableCourses.length > 0 ? (
          <>
            {availableCourses.map((partialCourse) => {
              const fullCourse = allCourses.find(
                (course) =>
                  course.subject === maybeSubjectCode &&
                  course.number === partialCourse.number
              )!;
              return (
                <CourseItem
                  termCode={termCode}
                  planId={planId}
                  subjectCode={fullCourse.subject}
                  courseNumber={fullCourse.number}
                />
              );
            })}
          </>
        ) : (
          filteredSubjects.map((subject) => {
            return (
              <SubjectItem
                key={subject.code}
                onClick={() => {
                  setQuery(`${subject.code} `);
                  setInputFocus();
                }}
                code={subject.code}
                description={subject.description}
              />
            );
          })
        )}
      </div>
    </>
  );
};

interface SubjectItemProps extends HTMLAttributes<HTMLButtonElement> {
  code: string;
  description: string;
}
const SubjectItem = ({
  children,
  code,
  description,
  ...props
}: SubjectItemProps) => {
  return (
    <button
      {...props}
      className="flex items-center w-full py-1 hover:bg-gray-100 rounded-md"
    >
      <div className="text-left w-[65px] text-bold">{code}</div>
      <p className="text-gray-600 text-sm">{description}</p>
    </button>
  );
};

interface CourseItemProps {
  termCode: string;
  planId: string;
  subjectCode: string;
  courseNumber: string;
}
const CourseItem = ({
  termCode,
  planId,
  subjectCode,
  courseNumber,
}: CourseItemProps) => {
  return (
    <Link
      key={`${subjectCode}${courseNumber}`}
      href={`${termCode}/${planId}/${courseToSlug(
        `${subjectCode} ${courseNumber}`
      )}`}
      className="block py-1 hover:bg-gray-100 rounded-md"
    >
      {subjectCode} {courseNumber}
    </Link>
  );
};
