import { getValuesFromTerm } from "@/utils/term/string";
import { ReactNode } from "react";
import terms from "../../.data/terms.json";
import { PlannerHeader } from "./planner-header";

export const revalidate = 0; // no cache
export const dynamic = "force-static";

interface TermLayoutProps {
  params: { termCode: string };
  children: ReactNode;
}

export default function TermLayout({ params, children }: TermLayoutProps) {
  const term = terms.find((term) => term.code === params.termCode);
  if (!term) throw Error("Invalid term");

  console.log(params);

  const { year, description } = getValuesFromTerm(term);
  return (
    <main>
      <PlannerHeader
        termCode={term.code}
        description={description}
        year={year!}
      />
      {children}
    </main>
  );
}
