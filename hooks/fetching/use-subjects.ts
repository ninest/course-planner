import { getSubjects } from "@/api/subjects";
import { useQuery } from "@tanstack/react-query";

export function useSubjects() {
  const { isLoading, isError, isSuccess, data } = useQuery(["subjects"], () => getSubjects());
  return { isLoading, isError, isSuccess, subjects: data };
}

export function useSubjectCodes() {
  const { subjects } = useSubjects();
  const subjectCodes = (subjects ?? []).map((subject) => subject.code);
  return subjectCodes;
}
