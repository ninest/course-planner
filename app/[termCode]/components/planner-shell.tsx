"use client";

import {
  Modal,
  ModalClose,
  ModalDescription,
  ModalTitle,
} from "@/components/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { XButton } from "@/components/x-button";
import { usePlans } from "@/hooks/use-plans";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { NewPlanForm } from "./new-plan-form";
import { Planner } from "./planner";

interface PlannerShellProps {
  termCode: string;
  description: string;
  year: string;
}

export const PlannerShell = ({
  termCode,
  description,
  year,
}: PlannerShellProps) => {
  const { plansForTerm } = usePlans();
  const [modalOpen, setModalOpen] = useState(false);
  const plans = plansForTerm(termCode);

  return (
    <>
      <Tabs defaultValue="1">
        <header className="px-5 pt-5 pb-5 border-b">
          <div className="lg:flex lg:space-x-5">
            <h1 className="font-bold text-lg">
              {description} <span className="text-gray-600">{year}</span>
            </h1>
            <div>
              <TabsList className="mt-2 lg:mt-0 lg:space-x-2 flex-wrap">
                {plans.map((plan, index) => {
                  return (
                    <TabsTrigger
                      key={`${plan.name}-${index}`}
                      value={String(index)}
                      className="mr-2 mb-2 lg:mr-0 lg:mb-0"
                    >
                      {plan.name}
                    </TabsTrigger>
                  );
                })}
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center h-7 py-1 px-3 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <Plus className="w-3" />
                </button>
              </TabsList>
            </div>
          </div>
        </header>

        <div className="p-5">
          {plans.map((plan, index) => {
            return (
              <TabsContent key={`${plan.name}-${index}`} value={String(index)}>
                <Planner id={plan.id} />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
      <Modal open={modalOpen} onOpenChange={setModalOpen}>
        <ModalClose>
          <XButton action={() => setModalOpen(false)} />
        </ModalClose>
        <ModalTitle className="my-4 font-bold text-xl">
          New course plan for {description}
        </ModalTitle>
        <ModalDescription>
          <p className="text-gray-700 mb-5">
            First give the plan a name and a description, then proceed to adding
            courses.
          </p>
        </ModalDescription>
        <NewPlanForm
          termCode={termCode}
          onSuccess={() => setModalOpen(false)}
        />
      </Modal>
    </>
  );
};
