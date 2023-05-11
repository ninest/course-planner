import { CalendarEvent } from "@/event/types";
import { atom, useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const previewEventsAtom = atom<CalendarEvent[]>([]);
const sectionsInPlanPreviewAtom = atom<string[]>([]);

// export const useWeekView = () => {
//   const pathname = usePathname();
//   const [previewEvents, _setPreviewEvents] = useAtom(previewEventsAtom);
//   const [sectionsInPlanPreview, setSectionsInPlanPreview] = useAtom(
//     sectionsInPlanPreviewAtom
//   );

//   // Set all preview events gray
//   const setPreviewEvents = (events: CalendarEvent[]) => {
//     _setPreviewEvents(
//       events.map((event) => ({
//         ...event,
//         color: "GRAY",
//         possible: true,
//       }))
//     );
//   };

//   // If section already in the plan is hover, set it to possible too so it jiggles
//   const addSectionToPreview = (crn: string) => setSectionsInPlanPreview([crn]);
//   const removeSectionsFromPreview = () => setSectionsInPlanPreview([]);

//   // Clear preview when route changes
//   useEffect(() => {
//     setPreviewEvents([]);
//     removeSectionsFromPreview();
//   }, [pathname]);

//   return {
//     previewEvents,
//     setPreviewEvents,
//     sectionsInPlanPreview,
//     addSectionToPreview,
//     removeSectionsFromPreview,
//   };
// };

export function useWeekView() {
  const [previewEvents, setPreviewEvents] = useAtom(previewEventsAtom);

  const addPreviewEvents = (calendarEvents: CalendarEvent[]) => {
    setPreviewEvents([...previewEvents, ...calendarEvents]);
  };

  const clearPreviewEvents = () => {
    setPreviewEvents([]);
  };

  return {
    previewEvents,
    addPreviewEvents,
    setPreviewEvents,
    clearPreviewEvents,
  };
}
