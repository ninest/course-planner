import { useState } from "react";
import subjects from "../../../.data/subjects.json";
import termCoursesMapping from "../../../.data/mappings/term-courses/202330.json";
import allCourses from "../../../.data/all-courses.json";
import { useRouter } from "next/navigation";
import { useFocus } from "@/hooks/util/use-focus";

interface CourseSearchProps {
  termCode: string;
}

export const CourseSearch = ({ termCode: string }: CourseSearchProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const filteredSubjects = subjects.filter((subject) =>
    subject.code.includes(query)
  );
  // @ts-ignore
  const availableCourses = termCoursesMapping[query.split(" ")[0]] ?? [];

  const [inputRef, setInputFocus] = useFocus();

  return (
    <div className="relative p-5 lg:h-[calc(100vh-5rem)] overflow-y-scroll">
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
            {availableCourses.map((partialCourse: any) => {
              const fullCourse = allCourses.find(
                (course) =>
                  course.subject === query.split(" ")[0] &&
                  course.number === partialCourse.number
              )!;
              return (
                <div
                  key={`${fullCourse.subject}${fullCourse.number}`}
                  className="py-1 hover:bg-gray-100 rounded-md"
                >
                  {fullCourse.subject} {fullCourse.number}
                </div>
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
    </div>
  );
};
