import { BackButton } from "@/components/back-button";
import { getValuesFromTerm } from "@/utils/term/string";
import terms from "../../.data/terms.json";
import { PlannerShell } from "./components/planner-shell";

interface TermPageProps {
  params: { termCode: string };
}

export default async function TermPage({ params }: TermPageProps) {
  return <div className="p-5">Select a plan or create one!</div>;
}
