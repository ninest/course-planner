import { getTerm, getTerms } from "@/api/terms";
import { useQuery } from "@tanstack/react-query";

export function useTerm(termCode: string) {
  const {
    isLoading: termIsLoading,
    isError: termIsError,
    isSuccess,
    data,
  } = useQuery(["term", termCode], () => getTerm(termCode));

  return { termIsLoading, termIsError, isSuccess, term: data };
}

export function useTerms() {
  const { isLoading, isError, isSuccess, data } = useQuery(["terms"], () => getTerms());

  return { isTermsLoading: isLoading, isError, isSuccess, terms: data };
}
