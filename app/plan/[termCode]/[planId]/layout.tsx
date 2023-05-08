import { ReactNode } from "react";
import { FaChevronUp } from "react-icons/fa";

interface TermLayoutProps {
  params: { termCode: string; planId: string };
  children: ReactNode;
}

export default function PlanPageLayout({ params, children }: TermLayoutProps) {
  return (
    <div>
      {/* Mobile */}
      <div className="md:hidden relative">
        <div className="p-3">Planner</div>

        <div className="bottom-0 border-t rounded-xl">
          <div className="my-3 flex items-center justify-center">
            <FaChevronUp />
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex h-[calc(100vh-4rem)]">
        <aside className="w-[300px] lg:w-[400px] overflow-y-scroll border-r">{children}</aside>
        <div className="p-3">Planner</div>
      </div>
    </div>
  );
}
