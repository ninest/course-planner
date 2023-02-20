"use client";

import { usePlans } from "@/hooks/use-plans";

interface PlanPageProps {
  params: { planId: string };
}

export default function PlanPage({ params }: PlanPageProps) {
  const { planById } = usePlans();
  const plan = planById(params.planId);
  if (!plan) throw new Error("Invalid plan");

  return <>{params.planId}</>
}
