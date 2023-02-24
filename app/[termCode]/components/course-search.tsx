"use client";

import { SubjectWithCourseCount } from "@/.data/types";
import { useCoursesForTerm } from "@/hooks/fetching/use-courses-for-term";
import { useFocus } from "@/hooks/util/use-focus";
import { courseToSlug } from "@/utils/course/course";
import Link from "next/link";
import { HTMLAttributes, useState } from "react";

interface CourseSearchProps {
  termCode: string;
  subjectsWithCounts: SubjectWithCourseCount[];
  planId: string;
}

export const CourseSearch = ({
  termCode,
  subjectsWithCounts,
  planId,
}: CourseSearchProps) => {
  const [query, setQuery] = useState("");
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

  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>();

  return (
    <>
      <fieldset className="sticky top-5">
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
        {!showCourses ? (
          <>
            {/* Subjects */}
            {filteredSubjects.map((subject) => {
              return (
                <SubjectItem
                  key={subject.code}
                  onClick={() => {
                    setQuery(`${subject.code} `);
                    setInputFocus();
                  }}
                  subjectWithCount={subject}
                />
              );
            })}
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
            {courses?.map((course) => {
              return (
                <CourseItem
                  termCode={termCode}
                  planId={planId}
                  subjectCode={course.subject}
                  courseNumber={course.number}
                />
              );
            })}
          </>
        )}
      </div>
      {/* <div className="mt-4">
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
      </div> */}
    </>
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
      <div className="text-left text-sm text-gray-700">{subjectWithCount.description}</div>
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
