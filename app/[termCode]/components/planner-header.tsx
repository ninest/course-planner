"use client";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { usePlans } from "@/hooks/use-plans";
import { MoreVertical, Plus, Share } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <header className="border-b lg:h-20 ">
      {/* MOBILE */}
      <div className="lg:hidden">
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
      <div className="hidden p-5 lg:flex items-center justify-between">
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
          <Button intent={"primary"}>Share</Button>
          <Button intent={"ghost"}>
            <MoreVertical className="w-4" />
          </Button>
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
  const router = useRouter();

  const plans = plansForTerm(termCode);

  // console.log(router);

  return (
    <>
      <div className="overflow-scroll space-x-1">
        {plans.map((plan) => {
          return (
            <Link
              key={plan.id}
              href={`/${termCode}/${plan.id}`}
              className="h-7 py-1 px-3 text-sm bg-gray-100 rounded-md"
            >
              {plan.name}
            </Link>
          );
        })}
        <Link
          href={`/${termCode}/new-plan`}
          className="h-7 inline-flex items-center py-1 px-3 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <Plus className="h-3 w-3" />
        </Link>
      </div>
    </>
  );
};

const NewPlanFormModal = () => {};
