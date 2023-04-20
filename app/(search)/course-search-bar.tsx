"use client";

import { FormField } from "@/components/form/form-field";
import { Select } from "@/components/form/select";
import { getSearchGroups, searchGroupsToQuery } from "@/utils/course/search";
import { decodeSearchQuery, encodeSearchQuery } from "@/utils/string";
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
    console.log("onSubmit");

    const { search, term } = data;
    const searchGroups = getSearchGroups({ query: search });
    const cleanSearchQuery = searchGroupsToQuery(searchGroups);

    const searchQuery = encodeSearchQuery(cleanSearchQuery);
    router.push(`?search=${searchQuery}`);
    setValue("search", cleanSearchQuery);
  });

  // Search when the url changes
  useEffect(() => {
    console.log("iniital search change");
    doSearch(initialSearch);
  }, [initialSearch]);

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
        {/* <input
          type="text"
          name="search"
          placeholder="Search courses, CRNs, ..."
          // onChange={onChange}
          // onKeyDown={onKeyDown}
          className="flex-1 form-field rounded-r-none"
        />
        <Select
          name="term"
          options={[
            { title: "All", value: "all" },
            { title: "Fall 2023", value: "202310" },
          ]}
          className="text-center w-[8rem] rounded-l-none border-l-0"
        /> */}
      </form>
    </>
  );
}
