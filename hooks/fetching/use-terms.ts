import { getTerm, getTerms } from "@/api/terms";
import { useQuery } from "@tanstack/react-query";

export function useTerm(termCode: string) {
  const { isLoading, isError, isSuccess, data } = useQuery(["term", termCode], () => getTerm(termCode));

  return { isLoading, isError, isSuccess, term: data };
}

export function useTerms() {
  const { isLoading, isError, isSuccess, data } = useQuery(["terms"], () => getTerms());

  return { isLoading, isError, isSuccess, terms: data };
}
