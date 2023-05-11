"use client";

import { Course, SubjectWithCourseCount } from "@/.data/types";
import { useCoursesForTerm } from "@/hooks/fetching/use-courses-for-term";
import { usePlans } from "@/hooks/use-plans";
import { useFocus } from "@/hooks/util/use-focus";
import { courseToSlug } from "@/course";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface CourseSearchProps {
  termCode: string;
  subjectsWithCounts: SubjectWithCourseCount[];
  planId: string;
}

const queryAtom = atomWithStorage<string>(
  "query",
  "",
  createJSONStorage(() => sessionStorage)
);

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

  const [inputRef, setInputFocus, inputIsFocused] =
    useFocus<HTMLInputElement>();

  const clearSearch = () => {
    setQuery("");
  };

  const onSubjectClick = (subjectCode: string) => {
    // Set query to subject code
    setQuery(`${subjectCode} `);
    // Focus on input only if already focused previously
    if (inputIsFocused) setInputFocus();
  };

  const { courses, isLoading: coursesLoading } = useCoursesForTerm(
    termCode,
    maybeSubjectCode
  );
  // Use a fuzzy search library
  const filteredCourses = maybeCourseNumber
    ? courses?.filter(
        (course) =>
          course.number.includes(maybeCourseNumber) ||
          course.title.toLowerCase().includes(maybeCourseNumber.toLowerCase())
      )
    : courses;

  const { numMySections } = usePlans();

  return (
    <div>
      <fieldset className="sticky top-0 px-5 pt-2 pb-3 md:pt-3 md:pb-3 bg-white/90">
        <div className="relative">
          <input
            ref={inputRef}
            className="form-field w-full"
            type="text"
            placeholder="Search courses ..."
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value.toUpperCase())}
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute top-[50%] right-2 -translate-y-1/2 hover:bg-gray-50"
            >
              <X className="w-5 text-gray-500" />
            </button>
          )}
        </div>
      </fieldset>

      <div className="px-5">
        {!showCourses ? (
          <>
            {/* Subjects */}
            <div className="space-y-1">
              <Link
                href={`/plan/${termCode}/${planId}/my-sections`}
                className="mb-2 w-full py-1 hover:bg-gray-100 rounded-md flex items-center justify-between"
              >
                <div>My sections</div>
                <div className="text-gray-600 text-sm">
                  {numMySections(planId)} sections
                </div>
              </Link>
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
              <h2 className="font-bold">{currentSubject?.description}</h2>
              <div className="text-sm text-gray-600">
                {/* TODO: fix */}
                {currentSubject?.numCourses == filteredCourses?.length
                  ? `${filteredCourses?.length}`
                  : `${filteredCourses?.length ?? "..."} / ${
                      currentSubject?.numCourses
                    }`}{" "}
                courses
              </div>
            </div>
            {coursesLoading && (
              <div className="text-center font-semibold text-gray-600">
                Loading courses ...
              </div>
            )}
            <div className="space-y-1">
              {filteredCourses?.map((course, index) => {
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
      href={`/plan/${termCode}/${planId}/${courseToSlug(
        `${course.subject} ${course.number}`
      )}`}
      className="block py-1 hover:bg-gray-100 rounded-md"
    >
      {course.subject} {course.number}{" "}
      <span className="text-gray-500">{course.title ?? "No title"}</span>
    </Link>
  );
};
