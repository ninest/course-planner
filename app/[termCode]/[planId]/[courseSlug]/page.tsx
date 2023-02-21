import { BackButton } from "@/components/back-button";

interface CourseQueryProps {
  params: { termCode: string; planId: string; courseSlug: string };
}

export default function CourseQueryPage({ params }: CourseQueryProps) {
  return (
    <>
      <BackButton href={`/${params.termCode}/${params.planId}`} text="Search" />
      <h3 className="mt-3 font-bold">{params.courseSlug}</h3>
    </>
  );
}
