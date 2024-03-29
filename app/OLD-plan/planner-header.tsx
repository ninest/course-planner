"use client";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { usePlans } from "@/hooks/use-plans";
import { useCurrentPlanId } from "@/utils/route";
import clsx from "clsx";
import { MoreVertical, Plus, Share } from "lucide-react";
import Link from "next/link";

interface PlannerHeaderProps {
  termCode: string;
  description: string;
  year: string;
}

export const PlannerHeader = ({
  termCode,
  description,
  year,
}: PlannerHeaderProps) => {
  return (
    <header className="sticky top-0 border-b h-24 md:h-16 flex items-center">
      <div className="w-full">
        {/* MOBILE */}
        <div className="md:hidden">
          <div className="px-5 pt-5 flex justify-between items-center">
            <BackButton />
            <div className="flex items-center space-x-3">
              <h1 className="font-bold text-lg">
                {description} <span className="text-gray-400">{year}</span>
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button>
                <Share className="w-4" />
              </button>
              <button>
                <MoreVertical className="w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 mb-5 pl-5 overflow-auto">
            <PlannerTabs termCode={termCode} description={description} />
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden p-5 md:flex items-center justify-between">
          <div className="flex items-center justify-center space-x-7">
            <BackButton />
            <h1 className="font-bold text-lg">
              {description} <span className="text-gray-400">{year}</span>
            </h1>
            <div className="overflow-auto max-w-[70vw]">
              <PlannerTabs termCode={termCode} description={description} />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant={"primary"}>Share</Button>
            <Button variant={"ghost"}>
              <MoreVertical className="w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

const PlannerTabs = ({
  termCode,
  description,
}: {
  termCode: string;
  description: string;
}) => {
  const { plansForTerm } = usePlans();
  const plans = plansForTerm(termCode);

  const selectedPlanId = useCurrentPlanId()

  return (
    <>
      <div className="overflow-scroll flex space-x-1">
        {plans.map((plan) => {
          return (
            <Link
              key={plan.id}
              href={`/plan/${termCode}/${plan.id}`}
              className={clsx(
                "h-7 inline-flex items-center py-1 px-3 text-sm  rounded-md",
                {
                  "bg-gray-100": selectedPlanId !== plan.id,
                  "bg-primary-100": selectedPlanId === plan.id,
                }
              )}
            >
              {plan.name}
            </Link>
          );
        })}
        <Link
          href={`/plan/${termCode}/new-plan`}
          className="h-7 inline-flex items-center py-1 px-3 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <Plus className="h-3 w-3" />
        </Link>
      </div>
    </>
  );
};

const NewPlanFormModal = () => {};
