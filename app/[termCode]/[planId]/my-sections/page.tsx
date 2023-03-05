import { SubPageBackButton } from "@/components/sub-page-back-button";

interface MySectionsPageProps {
  params: { termCode: string; planId: string };
}

export default async function MySectionsPage({ params }: MySectionsPageProps) {
  return (
    <>
      <div className="px-5 mt-5">
        <SubPageBackButton href={`/${params.termCode}/${params.planId}`} />
        <h3 className="my-1 font-bold">My sections</h3>
      </div>
    </>
  );
}
