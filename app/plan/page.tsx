"use client";

import { Term } from "@/.data/types";
import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Title } from "@/components/title";
import { useTerms } from "@/hooks/fetching/use-terms";
import { plansForTerm } from "@/plan";
import { getYearDisplay } from "@/term";
import { groupTermsByYear } from "@/term/group";
import Link from "next/link";
import { usePlan } from "../../plan/hooks";

export default function PlanPage() {
  const { isTermsLoading, terms } = useTerms();
  const { plans } = usePlan();

  const termsByYear = groupTermsByYear(terms ?? []);

  return (
    <>
      <main className="md:h-screen">
        <header className="p-5 flex justify-end items-center">
          <Button href={`/plan/${terms?.at(-1)?.code}/new`}>New Plan</Button>
        </header>

        <div className="px-5 space-y-8">
          {isTermsLoading && !terms && (
            <>
              <Loading
                heights={[
                  3,
                  { type: "spacer", height: 1 },
                  4,
                  { type: "spacer", height: 2 },
                  3,
                  { type: "spacer", height: 1 },
                  4,
                ]}
              />
            </>
          )}
          {termsByYear.map((group) => {
            return (
              <section key={group.year}>
                <Title level={2}>{getYearDisplay(group.year)}</Title>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {group.terms.map((term) => {
                    return <TermDisplay key={term.code} term={term} />;
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}

function TermDisplay({ term }: { term: Term }) {
  const { plans } = usePlan();
  const termPlans = plansForTerm(plans, term);

  return (
    <Link key={term.code} href={`/plan/${term.code}`} className="block border p-3 rounded-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <Title level={3} className="font-medium">
          {term.description}
        </Title>
        <div className="text-sm text-gray-600">{termPlans.length} plans</div>
      </div>
    </Link>
  );
}
