import { BackButton } from "@/components/back-button";
import { getValuesFromTerm } from "@/utils/term/string";
import terms from "../../.data/terms.json";
import { PlannerShell } from "./components/planner-shell";

interface TermPageProps {
  params: { termCode: string };
}
export default async function TermPage({ params }: TermPageProps) {
  const term = terms.find((term) => term.code === params.termCode);
  if (!term) throw Error("Invalid term");

  const { year, description } = getValuesFromTerm(term);

  return (
    <main>
      <PlannerShell
        termCode={term.code}
        description={description}
        year={year!}
        backButton={
          <>
            <BackButton />
          </>
        }
      />
    </main>
  );
}
