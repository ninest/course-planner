"use client";

import { FormField } from "@/components/form/form-field";
import { Select } from "@/components/form/select";
import { useTerms } from "@/hooks/fetching/use-terms";
import { getSearchGroups, searchGroupsToQuery } from "@/utils/course/search";
import { decodeSearchQuery, encodeSearchQuery } from "@/utils/string";
import { groupTermsByYear } from "@/utils/term/group";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchBar } from "./hooks/use-search-bar";

interface CourseSearchBarProps {}

interface CourseSearchForm {
  search: string;
  term: string;
}

export function CourseSearchBar({}: CourseSearchBarProps) {
  const router = useRouter();
  const params = useSearchParams();

  const { doSearch, setTerm } = useSearchBar();

  const initialSearch = decodeSearchQuery(params.get("search") || "");
  const initialTerm = params.get("term") || "all";

  const { handleSubmit, control, setValue, watch, getValues } = useForm<CourseSearchForm>({
    defaultValues: { search: initialSearch, term: initialTerm },
  });

  const onSubmit = handleSubmit((data) => {
    const { search, term } = data;
    const searchGroups = getSearchGroups({ query: search });
    const cleanSearchQuery = searchGroupsToQuery(searchGroups);

    const searchQuery = encodeSearchQuery(cleanSearchQuery);
    router.push(`?term=${term}&search=${searchQuery}`);
    setValue("search", cleanSearchQuery);
    setTerm(term);
  });

  // Search when the url changes
  useEffect(() => {
    doSearch(initialSearch);
  }, [initialSearch]);

  // Change term
  useEffect(() => {
    setTerm(getValues("term"));
  }, [watch("term")]);

  const { terms } = useTerms();
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
      <form className="flex" onSubmit={onSubmit}>
        <FormField
          control={control}
          name="search"
          placeholder="Search courses, CRNs, ..."
          wrapperClassName="flex-1"
          inputClassName="h-10 form-field rounded-r-none"
        />

        <div className="h-10 form-field rounded-l-none">
          <Select
            control={control}
            name="term"
            options={[{ type: "option", title: "All", value: "all" }, ...options]}
            // className="bg-gray-200 text-sm w-[9rem] p-2 rounded-l-none border-l-0"
            className="bg-gray-200 w-[9rem] text-xs p-1 rounded "
          />
        </div>
      </form>
    </>
  );
}
