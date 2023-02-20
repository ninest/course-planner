import { BackButton } from "@/components/back-button";
import { getValuesFromTerm } from "@/utils/term/string";
import { ReactNode } from "react";
import terms from "../../.data/terms.json";
import { PlannerHeader } from "./components/planner-header";
import { PlannerShell } from "./components/planner-shell";

interface TermLayoutProps {
  params: { termCode: string };
  children: ReactNode;
}

export default function TermLayout({ params, children }: TermLayoutProps) {
  const term = terms.find((term) => term.code === params.termCode);
  if (!term) throw Error("Invalid term");

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
