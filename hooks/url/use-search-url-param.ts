import { useSearchParams } from "next/navigation";

export function useSearchUrlParam() {
  const p = useSearchParams();
  const search = p.get("search");
  const term = p.get("term");

  // Whatever after questionmark
  return `term=${term}&search=${search}`;
}
