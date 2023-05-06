"use client";

import { FormField } from "@/components/form/form-field";
import { Select } from "@/components/form/select";
import { useTerms } from "@/hooks/fetching/use-terms";
import { getSearchGroups, searchGroupsToQuery } from "@/utils/course/search";
import { decodeSearchQuery, encodeSearchQuery } from "@/utils/string";
import { groupTermsByYear } from "@/utils/term/group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchBar } from "./hooks/use-search-bar";
import { useGetNewSearchUrlParam } from "@/app/(search)/hooks/use-search-url-param";
import { useSubjectCodes, useSubjects } from "@/hooks/fetching/use-subjects";

interface CourseSearchBarProps {}

interface CourseSearchForm {
  search: string;
  term: string;
}

export function CourseSearchBar({}: CourseSearchBarProps) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const subjectCodes = useSubjectCodes();

  const { isTermsLoading, terms } = useTerms();

  const { doSearch, setTerm } = useSearchBar(subjectCodes);

  const initialSearch = decodeSearchQuery(params.get("search") || "");
  const initialTerm = params.get("term") || "all";

  const { handleSubmit, control, setValue, watch, getValues } = useForm<CourseSearchForm>({
    defaultValues: { search: initialSearch, term: initialTerm },
  });

  const onSubmit = handleSubmit((data, e) => {
    e?.preventDefault();
    
    const { search, term } = data;
    const searchGroups = getSearchGroups({ subjectCodes, query: search });
    const cleanSearchQuery = searchGroupsToQuery(searchGroups);
    const searchQuery = encodeSearchQuery(cleanSearchQuery);

    // Pathname ahead so current course being viewed is not lost
    router.push(`${pathname}?term=${term}&search=${searchQuery}`);
    setValue("search", cleanSearchQuery);
    setTerm(term);
  });

  // Search when the url changes
  useEffect(() => {
    doSearch(initialSearch);
  }, [initialSearch]);

  // Change term
  const { getNewSearchUrlParam } = useGetNewSearchUrlParam();

  useEffect(() => {
    const term = getValues("term");
    const newParams = getNewSearchUrlParam({ term });

    const paramsSame = params.toString() === newParams.toString();
    if (!paramsSame) {
      router.push(`${pathname}?${newParams}`);
      setTerm(term);
    }
  }, [watch("term")]);

  const termGroups = groupTermsByYear(terms ?? []);

  const options = termGroups.map((group) => ({
    type: "optgroup" as const,
    name: `${group.year - 1}-${group.year}`,
    options: group.terms.map((term) => ({
      type: "option" as const,
      title: term.description,
      value: term.code,
    })),
  }));

  return (
    <>
      {isTermsLoading ? (
        <div className="form-field h-10"></div>
      ) : (
        <form onSubmit={onSubmit} className="flex group rounded-md focus-within:ring-2 ring-offset-2 ring-primary-200">
          <FormField
            control={control}
            name="search"
            placeholder="Search courses, CRNs, ..."
            wrapperClassName="flex-1"
            inputClassName="h-10 form-field pr-0 rounded-r-none focus:ring-0"
          />

          <div className="flex-0 h-10 form-field rounded-l-none flex items-end pl-0">
            <Select
              control={control}
              name="term"
              options={[{ type: "option", title: "All", value: "all" }, ...options]}
              className="form-field bg-gray-200 text-xs rounded p-1 min-w-[3rem]"
            />
          </div>
        </form>
      )}
    </>
  );
}
