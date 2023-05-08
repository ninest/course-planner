import { ReactNode } from "react";

interface TermLayoutProps {
  params: { termCode: string; planId: string };
  children: ReactNode;
}

export default function PlanPageLayout({ params, children }: TermLayoutProps) {
  return (
    <div>
      {/* Mobile */}

      {/* Desktop */}
      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="w-[300px] lg:w-[400px] overflow-y-scroll border-r">{children}</aside>
        <div className="p-3">Planner</div>
      </div>
    </div>
  );
}
