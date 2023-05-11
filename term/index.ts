import { Course } from "@/.data/types";

export const termCodes = [
  { id: "10", name: "Fall" },
  { id: "30", name: "Spring" },
  { id: "40", name: "Summer I" },
  { id: "60", name: "Summer II" },
  { id: "50", name: "Summer Full" },
];

// Get the terms the course was offerred in
export function getCourseTerms(course: Course) {
  const terms: string[] = [...new Set(course.sections.map((section) => section.term))];
  return terms;
}

export function getTermName(term: string) {
  const academicYear = getTermYear(term);

  const termId = term.substring(4, 6);

  const termName = termCodes.find((term) => term.id === termId)?.name;

  let actualYear = parseInt(academicYear);
  if (termId === "10") actualYear--;

  return `${termName} ${actualYear}`;
}

export function getTermYear(term: string) {
  return term.substring(0, 4);
}

// Get "2023-2024" display string
export function getYearDisplay(year: number) {
  return `${year-1}-${year}`;
}
