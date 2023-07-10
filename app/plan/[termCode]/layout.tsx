"use client";

import { Term } from "@/.data/types";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { Title } from "@/components/title";
import { useTerm } from "@/hooks/fetching/use-terms";
import { plansForTerm } from "@/plan";
import { getValuesFromTerm } from "@/term/string";
import clsx from "clsx";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import { usePlan } from "../../../plan/hooks";
import { Plan } from "../../../plan/types";

interface TermLayoutProps {
  params: { termCode: string };
  children: ReactNode;
}

export default function TermLayout({ params, children }: TermLayoutProps) {
  const { termIsLoading, termIsError, term } = useTerm(params.termCode);
  const { plans } = usePlan();
  if (!term || !plans)
    return (
      <main>
        <div className="p-5">
          <BackButton href="/plan" />
        </div>
      </main>
    );

  const { year, description } = getValuesFromTerm(term);
  const termPlans = plansForTerm(plans, term);

  return (
    <main className="min-h-[100dvh] [--plan-header-height:6rem] md:[--plan-header-height:4rem]">
      <div className="p-5 h-[var(--plan-header-height)] border-b flex items-center">
        <div className="flex-1 flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:space-x-8">
          <div className="flex justify-between items-center space-x-5">
            <BackButton href="/plan" />

            <Link href={`/plan/${term.code}`}>
              <Title level={1} className="text-lg">
                {description} <span className="text-gray-400">{year}</span>
              </Title>
            </Link>

            {/* More actions */}
            <div className="md:hidden">
              <FaEllipsisV className="text-gray-500 h-3" />
            </div>
          </div>
          <PlannerTabs term={term} plans={termPlans} />
        </div>
      </div>

      <div>
        <div>{children}</div>
      </div>
    </main>
  );
}

interface PlannerTabsProps {
  term: Term;
  plans: Plan[];
}

function PlannerTabs({ term, plans }: PlannerTabsProps) {
  const pathname = usePathname();

  return (
    <header className="flex space-x-2">
      {plans.map((plan) => {
        return (
          <Button
            key={plan.id}
            href={`/plan/${term.code}/${plan.id}`}
            size={"xs"}
            className={clsx("h-6", { "!bg-primary-100": pathname?.includes(plan.id) })}
          >
            {plan.name}
          </Button>
        );
      })}
      <Button
        href={`/plan/${term.code}/new`}
        size={"xs"}
        iconLeft={<FaPlus className="h-2" />}
        className={clsx("h-6", { "bg-primary-100": pathname?.endsWith("/new") })}
      ></Button>
    </header>
  );
}
