import { useState } from "react";
import subjects from "../../../.data/subjects.json";
import termCoursesMapping from "../../../.data/mappings/term-courses/202330.json";
import allCourses from "../../../.data/all-courses.json";
import { useRouter } from "next/navigation";
import { useFocus } from "@/hooks/util/use-focus";
import Link from "next/link";
import { courseToSlug } from "@/utils/course/course";
import { getTermCourses } from "@/services/term-courses";
import { useTermCourses } from "@/hooks/mapping/use-term-course";

interface CourseSearchProps {
  termCode: string;
  planId: string;
}

export const CourseSearch = ({ termCode, planId }: CourseSearchProps) => {
  // Get term course mapping for this term
  const { isLoading, isError, isSuccess, termCoursesMapping } =
    useTermCourses(termCode);

  const [query, setQuery] = useState("");
  const filteredSubjects = subjects.filter((subject) =>
    subject.code.includes(query)
  );
  // @ts-ignore
  const availableCourses = termCoursesMapping?.[query.split(" ")[0]] ?? [];

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

      {isLoading && <div>Loading ...</div>}
      {isError && <div>Oh no, error!</div>}
      {isSuccess && (
        <div className="mt-4">
          {availableCourses.length > 0 ? (
            <>
              {availableCourses.map((partialCourse: any) => {
                const fullCourse = allCourses.find(
                  (course) =>
                    course.subject === query.split(" ")[0] &&
                    course.number === partialCourse.number
                )!;
                return (
                  <Link
                    key={`${fullCourse.subject}${fullCourse.number}`}
                    href={`${termCode}/${planId}/${courseToSlug(
                      `${fullCourse.subject} ${fullCourse.number}`
                    )}`}
                    className="block py-1 hover:bg-gray-100 rounded-md"
                  >
                    {fullCourse.subject} {fullCourse.number}
                  </Link>
                );
              })}
            </>
          ) : (
            filteredSubjects.map((subject) => {
              return (
                <button
                  key={subject.code}
                  onClick={() => {
                    setQuery(`${subject.code} `);
                    setInputFocus();
                  }}
                  className="flex items-center w-full py-1 hover:bg-gray-100 rounded-md"
                >
                  <div className="text-left w-[70px] text-bold">
                    {subject.code}
                  </div>
                  <p className="text-gray-600 text-sm">{subject.description}</p>
                </button>
              );
            })
          )}
        </div>
      )}
    </>
  );
};
