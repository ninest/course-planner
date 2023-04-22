import { CourseSearchBar } from "./course-search-bar";

export function SearchHeader() {
  return (
    <header className="md:h-[5rem] border-b p-5 flex items-center">
      <div className="w-full flex flex-col space-y-2 md:space-y-0 md:space-x-12 md:flex-row md:items-center">
        <h1 className="text-lg font-bold">Courses</h1>
        <div className="md:w-2/4">
          <CourseSearchBar />
        </div>
      </div>
    </header>
  );
}
