"use client";

import { SubPageBackButton } from "@/components/sub-page-back-button";
import { useSearchUrlParam } from "../hooks/use-search-url-param";

export function MobileCourseSearchBackButton() {
  const searchUrlParams = useSearchUrlParam();
  
  return <SubPageBackButton href={`/?${searchUrlParams.toString()}`} />;
}
