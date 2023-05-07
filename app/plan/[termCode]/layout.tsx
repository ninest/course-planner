"use client";

import { Debug } from "@/components/debug";
import { Title } from "@/components/title";
import { useTerm } from "@/hooks/fetching/use-terms";
import { usePlans } from "@/hooks/use-plans";
import { getValuesFromTerm } from "@/utils/term/string";
import { ReactNode } from "react";
import { usePlan } from "../hooks/plan";

interface TermLayoutProps {
  params: { termCode: string };
  children: ReactNode;
}

export default function TermLayout({ params, children }: TermLayoutProps) {
  const { termIsLoading, termIsError, term } = useTerm(params.termCode);
  const { plans } = usePlans();
  if (!term || !plans) return <main>Loading ...</main>;

  const { year, description } = getValuesFromTerm(term);

  return (
    <main className="">
      <Title level={1} className="text-lg">
        {description} <span className="text-gray-400">{year}</span>
      </Title>

      <Debug data={plans} />
      <div>{children}</div>
    </main>
  );
}
