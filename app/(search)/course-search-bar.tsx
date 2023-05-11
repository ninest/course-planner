"use client";

import { FormField } from "@/components/form/form-field";
import { Select } from "@/components/form/select";
import { useSubjectCodes } from "@/hooks/fetching/use-subjects";
import { useTerms } from "@/hooks/fetching/use-terms";
import { getSearchGroups, searchGroupsToQuery } from "@/course/search";
import { decodeSearchQuery, encodeSearchQuery } from "@/utils/string";
import { groupTermsByYear } from "@/term/group";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearch } from "./hooks/use-search";
import { useGetNewSearchUrlParam, useGetSearchUrlParamValues } from "./hooks/use-search-url-param";

interface CourseSearchForm {
  search: string;
  term: string;
}

interface CourseSearchBarProps {
  allowSelectTerm?: boolean;
}

export function CourseSearchBar({ allowSelectTerm = true }: CourseSearchBarProps) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const { getNewSearchUrlParam } = useGetNewSearchUrlParam();

  const { subjectCodesIsLoading, subjectCodes } = useSubjectCodes();
  const { isTermsLoading, terms } = useTerms();
  const isLoading = subjectCodesIsLoading || isTermsLoading;

  const initialSearch = decodeSearchQuery(params?.get("search") || "");
  const initialTerm = params?.get("term") || "all";

  const { handleSubmit, control, setValue, watch, getValues } = useForm<CourseSearchForm>({
    defaultValues: { search: initialSearch, term: initialTerm },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { search, term } = data;

    // Set URL
    const searchGroups = getSearchGroups({ subjectCodes, query: search });
    const cleanSearchQuery = searchGroupsToQuery(searchGroups);
    const searchQuery = encodeSearchQuery(cleanSearchQuery);
    // TODO: use URLSearchParams rather than string
    if (allowSelectTerm) {
      router.push(`${pathname}?term=${term}&search=${searchQuery}`);
    } else {
      router.push(`${pathname}?search=${searchQuery}`);
    }
  });

  // Set URL on term change
  useEffect(() => {
    if (allowSelectTerm) {
      const term = getValues("term");
      const newParams = getNewSearchUrlParam({ term });
      router.push(`${pathname}?${newParams.toString()}`);
    }
  }, [watch("term")]);

  const termGroups = groupTermsByYear(terms ?? []);
  const termOptions = termGroups.map((group) => ({
    type: "optgroup" as const,
    name: `${group.year - 1}-${group.year}`,
    options: group.terms.map((term) => ({
      type: "option" as const,
      title: term.description,
      value: term.code,
    })),
  }));

  const { term, searchQuery } = useGetSearchUrlParamValues();
  const { doSearch, searchIsLoading } = useSearch({ subjectCodes });
  useEffect(() => {
    // Set form values if changed
    const formTerm = getValues("term");
    const formSearch = getValues("search");
    if (allowSelectTerm && term && formTerm !== term) setValue("term", term);
    if (searchQuery && formSearch !== searchQuery) setValue("search", searchQuery);

    doSearch(searchQuery);
  }, [params]);

  // Run initial page load search
  useEffect(() => {
    if (!isLoading) {
      doSearch(searchQuery);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="form-field h-10"></div>
      ) : (
        <form
          onSubmit={onSubmit}
          className={clsx("flex group rounded-md focus-within:ring-2 ring-offset-2 ring-primary-200", {
            "animate-pulse": searchIsLoading,
          })}
        >
          <FormField
            control={control}
            name="search"
            placeholder="Search courses, CRNs, ..."
            wrapperClassName="flex-1"
            inputClassName="h-10 form-field pr-0 rounded-r-none focus:ring-0"
          />

          <div className="flex-0 h-10 form-field rounded-l-none flex items-end pl-0">
            {allowSelectTerm && (
              <Select
                control={control}
                name="term"
                options={[{ type: "option", title: "All", value: "all" }, ...termOptions]}
                className="form-field bg-gray-200 text-xs rounded p-1 min-w-[3rem]"
              />
            )}
          </div>
        </form>
      )}
    </>
  );
}
