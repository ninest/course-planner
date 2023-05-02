import { slugToCourse2 } from "@/utils/course/course";

import { usePathname } from "next/navigation";

export function useUrlCourse() {
  const pathname = usePathname();
  const slugs = pathname?.split("/").filter(Boolean);

  const courses = slugs?.map(slugToCourse2);
  return courses;
}
