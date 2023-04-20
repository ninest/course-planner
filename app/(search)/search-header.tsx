import { CourseSearchBar } from "./course-search-bar";

export function SearchHeader() {
  return (
    <header className="border-b p-5 flex flex-col">
      <h1 className="text-lg font-bold text-center mb-2">Courses</h1>
      <CourseSearchBar />
    </header>
  );
}
