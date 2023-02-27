"use client";

import { Course, SubjectWithCourseCount } from "@/.data/types";
import { useCoursesForTerm } from "@/hooks/fetching/use-courses-for-term";
import { useFocus } from "@/hooks/util/use-focus";
import { courseToSlug } from "@/utils/course/course";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import Link from "next/link";
import { ChangeEvent, HTMLAttributes, useState } from "react";

interface CourseSearchProps {
  termCode: string;
  subjectsWithCounts: SubjectWithCourseCount[];
  planId: string;
}

const queryAtom = atomWithStorage<string>("query", "");

export const CourseSearch = ({
  termCode,
  subjectsWithCounts,
  planId,
}: CourseSearchProps) => {
  const [query, setQuery] = useAtom(queryAtom);
  const filteredSubjects = subjectsWithCounts.filter((subject) =>
    subject.code.includes(query)
  );
  const showCourses = query.includes(" ");
  const [maybeSubjectCode, maybeCourseNumber] = query.split(" ");
  const currentSubject = subjectsWithCounts.find(
    (subject) => subject.code === maybeSubjectCode
  );
  const { courses, isLoading: coursesLoading } = useCoursesForTerm(
    termCode,
    maybeSubjectCode
  );

  const [inputRef, setInputFocus, inputIsFocused] =
    useFocus<HTMLInputElement>();

  const onSubjectClick = (subjectCode: string) => {
    // Set query to subject code
    setQuery(`${subjectCode} `);
    // Focus on input only if already focused previously
    if (inputIsFocused) setInputFocus();
  };

  return (
    <div className="px-5">
      <fieldset className="sticky top-3">
        <input
          ref={inputRef}
          className="form-field w-full"
          type="text"
          placeholder="Search courses ..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value.toUpperCase())}
        />
      </fieldset>

      <div className="mt-4">
        {!showCourses ? (
          <>
            {/* Subjects */}
            <div className="space-y-1">
              {filteredSubjects.map((subject) => {
                return (
                  <SubjectItem
                    key={subject.code}
                    onClick={() => onSubjectClick(subject.code)}
                    subjectWithCount={subject}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Courses */}
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold">{currentSubject?.description}</h3>
              <div className="text-sm text-gray-600">
                {currentSubject?.numCourses} courses
              </div>
            </div>
            {coursesLoading && (
              <div className="text-center font-semibold text-gray-600">
                Loading courses ...
              </div>
            )}
            <div className="space-y-1">
              {courses?.map((course, index) => {
                return (
                  <CourseItem
                    key={index}
                    termCode={termCode}
                    planId={planId}
                    course={course}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface SubjectItemProps extends HTMLAttributes<HTMLButtonElement> {
  subjectWithCount: SubjectWithCourseCount;
}
const SubjectItem = ({ subjectWithCount, ...props }: SubjectItemProps) => {
  return (
    <button {...props} className="w-full py-1 hover:bg-gray-100 rounded-md">
      <div className="flex items-center justify-between">
        <div className="text-left w-[65px] text-bold">
          {subjectWithCount.code}
        </div>
        <div className="text-gray-600 text-sm">
          {subjectWithCount.numCourses} courses
        </div>
      </div>
      <div className="text-left text-sm text-gray-700">
        {subjectWithCount.description}
      </div>
    </button>
  );
};

interface CourseItemProps {
  termCode: string;
  planId: string;
  course: Course;
}
const CourseItem = ({ termCode, planId, course }: CourseItemProps) => {
  return (
    <Link
      key={`${course.subject}${course.number}`}
      href={`${termCode}/${planId}/${courseToSlug(
        `${course.subject} ${course.number}`
      )}`}
      className="block py-1 hover:bg-gray-100 rounded-md"
    >
      {course.subject} {course.number}{" "}
      <span className="text-gray-500">{course.title ?? "No title"}</span>
    </Link>
  );
};
