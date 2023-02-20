import { useState } from "react";
import subjects from "../../../.data/subjects.json";
import termCoursesMapping from "../../../.data/mappings/term-courses/202330.json";
import allCourses from "../../../.data/all-courses.json";

interface CourseSearchProps {
  termCode: string;
}

export const CourseSearch = ({ termCode: string }: CourseSearchProps) => {
  const [query, setQuery] = useState("");
  const filteredSubjects =
    query === ""
      ? []
      : subjects.filter((subject) => subject.code.includes(query));
  // @ts-ignore
  const availableCourses = termCoursesMapping[query.split(" ")[0]] ?? [];

  return (
    <div>
      <fieldset>
        <input
          className="form-field w-full"
          type="text"
          placeholder="Search courses ..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value.toUpperCase())}
        />
      </fieldset>

      <div className="mt-4 space-y-2">
        {availableCourses.length > 0 ? (
          <>
            {availableCourses.map((partialCourse: any) => {
              const fullCourse = allCourses.find(
                (course) =>
                  course.subject === query.split(" ")[0] &&
                  course.number === partialCourse.number
              )!;
              return (
                <div key={`${fullCourse.subject}${fullCourse.number}`}>
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
                onClick={() => setQuery(`${subject.code} `)}
                className="flex items-center w-full -m-2 p-2 hover:bg-gray-100 rounded-md"
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
