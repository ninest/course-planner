"use client";
import { SectionsList } from "@/components/course/sections/OLD_sections-list";
import { Empty } from "@/components/Empty";
import { SubPageBackButton } from "@/components/sub-page-back-button";
import { useMultipleSections } from "@/hooks/fetching/use-sections";
import { usePlans } from "@/hooks/use-plans";
import { getPlanCourses, getPlanCourseSectionsFromSections, getPlanSectionCrns } from "@/utils/OLD_plan/functions";

interface MySectionsPageProps {
  params: { termCode: string; planId: string };
}

export default function MySectionsPage({ params }: MySectionsPageProps) {
  const { planById } = usePlans();
  const plan = planById(params.planId);
  if (!plan) throw new Error("Invalid plan");

  // const { sections, isLoading, isError } = useMultipleSections(params.termCode, getPlanSectionCrns(plan));

  return (
    <>
      <div className="px-5 mt-5">
        <SubPageBackButton href={`/plan/${params.termCode}/${params.planId}`} />
        <h2 className="mt-1 mb-2 font-bold">My sections</h2>

        <>
          {plan.items.length > 0 ? (
            <></>
            // <SectionsList
            //   termCode={params.termCode}
            //   isLoading={isLoading}
            //   courses={getPlanCourses(plan)}
            //   sections={sections ?? []}
            //   planId={params.planId}
            // />
          ) : (
            <Empty className="p-2">No events added. Go back and add one</Empty>
          )}
        </>
      </div>
    </>
  );
}
