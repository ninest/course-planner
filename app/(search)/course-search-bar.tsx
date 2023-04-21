"use client";

import { FormField } from "@/components/form/form-field";
import { Select } from "@/components/form/select";
import { useTerms } from "@/hooks/fetching/use-terms";
import { getSearchGroups, searchGroupsToQuery } from "@/utils/course/search";
import { decodeSearchQuery, encodeSearchQuery } from "@/utils/string";
import { groupTermsByYear } from "@/utils/term/group";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect } from "react";
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

  const { doSearch } = useSearchBar();

  const initialSearch = decodeSearchQuery(params.get("search") || "");
  const { handleSubmit, control, setValue } = useForm<CourseSearchForm>({
    defaultValues: { search: initialSearch, term: "all" },
  });

  const onSubmit = handleSubmit((data) => {
    const { search, term } = data;
    const searchGroups = getSearchGroups({ query: search });
    const cleanSearchQuery = searchGroupsToQuery(searchGroups);

    const searchQuery = encodeSearchQuery(cleanSearchQuery);
    router.push(`?search=${searchQuery}`);
    setValue("search", cleanSearchQuery);
  });

  // Search when the url changes
  useEffect(() => {
    doSearch(initialSearch);
  }, [initialSearch]);

  const { terms } = useTerms();
  const termGroups = groupTermsByYear(terms ?? []);

  console.log(termGroups);

  const options = termGroups.map((group) => ({
    type: "optgroup" as const,
    name: `${group.year-1}-${group.year}`,
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
          inputClassName="form-field rounded-r-none"
        />

        <Select
          control={control}
          name="term"
          options={[{ type: "option", title: "All", value: "all" }, ...options]}
          className="text-sm w-[9rem] rounded-l-none border-l-0"
        />
      </form>
    </>
  );
}
