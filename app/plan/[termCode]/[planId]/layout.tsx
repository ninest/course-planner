"use client";

import { TransparentHeader } from "@/components/sticky-transparent-header";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { Planner } from "./planner";

interface TermLayoutProps {
  params: { termCode: string; planId: string };
  children: ReactNode;
}

export default function PlanPageLayout({ params, children }: TermLayoutProps) {
  /* 
  Mobile only bottom sheet:
  Clicking on the bottom sheet will expand it
  When expanded, clicking on the down caret or the planner UI will collapse it
  */
  const [bottomSheetExpanded, setBottomSheetExpanded] = useState(false);

  return (
    <div>
      {/* Mobile */}
      <div className="md:hidden h-[calc(100vh-var(--plan-header-height))] flex flex-col [--collapsed-bottom-sheet-height:5.5rem] [--expanded-bottom-sheet-height:85%]">
        <div
          onClick={() => {
            if (bottomSheetExpanded) setBottomSheetExpanded(false);
          }}
          className={clsx(
            "z-10 max-h-[100rem] transition-all",
            {
              "h-[calc(100%-var(--collapsed-bottom-sheet-height))]": !bottomSheetExpanded,
              "h-[calc(100%-var(--expanded-bottom-sheet-height))]": bottomSheetExpanded,
            },
            "overflow-y-scroll"
          )}
        >
          <Planner planId={params.planId} />
        </div>

        <div
          className={clsx(
            // Setting max height so height change can be animated with transition
            "z-50 border mx-1 rounded-t-xl max-h-[100rem] shadow-md transition-all",
            {
              "h-[var(--collapsed-bottom-sheet-height)]": !bottomSheetExpanded,
              "h-[var(--expanded-bottom-sheet-height)]": bottomSheetExpanded,
            },
            "overflow-y-scroll",
            "[--bottom-sheet-handle-container-height:2rem]"
          )}
        >
          <TransparentHeader
            onClick={() => setBottomSheetExpanded(!bottomSheetExpanded)}
            className="sticky top-0 h-[var(--bottom-sheet-handle-container-height)] flex items-center justify-center group"
          >
            <div className="px-1 rounded group-hover:bg-gray-50">
              <FaChevronUp
                className={clsx("text-gray-300 transition-all", { "[transform:rotateX(180deg)]": bottomSheetExpanded })}
              />
            </div>
          </TransparentHeader>
          <div
            onClick={() => {
              if (!bottomSheetExpanded) setBottomSheetExpanded(true);
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex h-[calc(100vh-var(--plan-header-height))]">
        <aside className="w-[300px] lg:w-[400px] overflow-y-scroll border-r">{children}</aside>
        <div className="flex-1">
          <Planner planId={params.planId} />
        </div>
      </div>
    </div>
  );
}
