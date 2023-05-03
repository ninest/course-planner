import { useSearchParams } from "next/navigation";

export interface URLSearchParam {
  search?: string;
  term?: string;
}

export function useSearchUrlParam() {
  const p = useSearchParams();
  const search = p.get("search");
  const term = p.get("term");

  // Whatever after questionmark
  return `term=${term}&search=${search}`;
}

export function useGetNewSearchUrlParam() {
  const p = useSearchParams();
  
  const getNewSearchUrlParam = (params: URLSearchParam) => {
    const search = params.search ?? p.get("search");
    const term = params.term ?? p.get("term");

    const newParams = new URLSearchParams({})
    if (search) newParams.set('search', search)
    if (term) newParams.set('term', term)
    
    // Whatever after questionmark
    return newParams.toString();
  }

  return { getNewSearchUrlParam }
}