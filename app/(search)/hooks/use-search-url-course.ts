import { slugToCourse2 } from "@/course";

import { usePathname } from "next/navigation";

// Get the currently viewing courses from the search page URL
// Example: /CS2500/CS2501?search=... => [ CS 2500, CS 2501 ]
export function useUrlCourse() {
  const pathname = usePathname();
  const slugs = pathname?.split("/").filter(Boolean);

  const courses = slugs?.map(slugToCourse2);
  return courses;
}
