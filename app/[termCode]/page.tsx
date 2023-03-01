"use client";

import { usePlans } from "@/hooks/use-plans";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const revalidate = 0; // no cache
export const dynamic = "force-static";

interface TermPageProps {
  params: { termCode: string };
}

export default function TermPage({ params }: TermPageProps) {
  const router = useRouter();
  const { plansForTerm } = usePlans();
  const plans = plansForTerm(params.termCode);

  useEffect(() => {
    if (plans.length == 1) {
      router.push(`/${params.termCode}/${plans[0].id}`);
    }
  }, [plans]);

  return <div className="p-5">Select a plan or create one!</div>;
}
