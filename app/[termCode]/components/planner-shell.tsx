"use client";

import { Button } from "@/components/button";
import {
  Modal,
  ModalClose,
  ModalDescription,
  ModalTitle,
} from "@/components/modal";
import { XButton } from "@/components/x-button";
import { usePlans } from "@/hooks/use-plans";
import { MoreVertical, Plus, Share } from "lucide-react";
import { ReactNode, useState } from "react";
import { NewPlanForm } from "./new-plan-form";
import { Planner } from "./planner";

interface PlannerShellProps {
  termCode: string;
  description: string;
  year: string;
  backButton: ReactNode;
}

export const PlannerShell = ({
  termCode,
  description,
  year,
  backButton,
}: PlannerShellProps) => {
  const { plansForTerm } = usePlans();
  const [modalOpen, setModalOpen] = useState(false);
  const plans = plansForTerm(termCode);

  // const tabsList = (
  //   <TabsList className="space-x-1 overflow-scroll">
  //     {plans.map((plan, index) => {
  //       return (
  //         <TabsTrigger key={plan.id} value={plan.id} className="">
  //           {plan.name}
  //         </TabsTrigger>
  //       );
  //     })}

  //     <button
  //       onClick={() => setModalOpen(true)}
  //       className="inline-flex items-center h-7 py-1 px-3 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
  //     >
  //       <Plus className="h-3 w-3" />
  //     </button>
  //   </TabsList>
  // );

  return (
    <>
      <header className="border-b lg:h-20">
        <div className="lg:hidden">
          <div className="px-5 pt-5 flex justify-between items-center">
            {backButton}
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

          {/* <div className="mt-3 mb-5 pl-5 overflow-auto">{tabsList}</div> */}
        </div>

        <div className="hidden p-5 lg:flex items-center justify-between">
          <div className="flex items-center justify-center space-x-7">
            {backButton}
            <h1 className="font-bold text-lg">
              {description} <span className="text-gray-400">{year}</span>
            </h1>
            {/* <div className="overflow-auto max-w-[70vw]">{tabsList}</div> */}
          </div>
          <div className="flex items-center space-x-4">
            <Button intent={"primary"}>Share</Button>
            {/* <button>
                <MoreVertical className="w-4" />
              </button> */}
            <Button intent={"ghost"}>
              <MoreVertical className="w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="">
        {/* {plans.map((plan, index) => {
            return (
              <TabsContent key={plan.id} value={plan.id}>
                <Planner id={plan.id} />
              </TabsContent>
            );
          })} */}
        {/* {children} */}
      </div>

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
