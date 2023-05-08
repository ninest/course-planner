"use client";

import { useTerm } from "@/hooks/fetching/use-terms";
import { ReactNode } from "react";

interface TermPageProps {
  params: { termCode: string };
  children: ReactNode;
}

export default function TermPage({ params }: TermPageProps) {
  const { termIsLoading, termIsError, term } = useTerm(params.termCode);

  return (
    <main className="p-5">
      Select a plan or create one.
    </main>
  );
}
