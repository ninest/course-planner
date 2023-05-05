import { useSearchParams } from "next/navigation";

export interface CourseSearchURLSearchParam {
  search?: string;
  term?: string;
}

// Get the course search url params as a string
export function useSearchUrlParam() {
  const p = useSearchParams();
  const params = new URLSearchParams({});

  const term = p.get("term");
  const search = p.get("search");

  if (term) params.set("term", term);
  if (search) params.set("search", search);

  // Whatever after questionmark
  return params;
}

export function useGetNewSearchUrlParam() {
  const p = useSearchParams();

  // Get new URLSearchParams building off what's currently in the URL
  const getNewSearchUrlParam = (params: CourseSearchURLSearchParam) => {
    const term = params.term ?? p.get("term");
    const search = params.search ?? p.get("search");

    const newParams = new URLSearchParams({});
    if (term) newParams.set("term", term);
    if (search) newParams.set("search", search);

    return newParams;
  };

  return { getNewSearchUrlParam };
}
