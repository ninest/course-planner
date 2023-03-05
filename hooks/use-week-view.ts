import { CalendarEvent } from "@/utils/event/types";
import { atom, useAtom } from "jotai";

const previewEventsAtom = atom<CalendarEvent[]>([]);
const sectionsInPlanPreviewAtom = atom<string[]>([]);

export const useWeekView = () => {
  const [previewEvents, _setPreviewEvents] = useAtom(previewEventsAtom);
  const [sectionsInPlanPreview, setSectionsInPlanPreview] = useAtom(
    sectionsInPlanPreviewAtom
  );

  // Set all preview events gray
  const setPreviewEvents = (events: CalendarEvent[]) => {
    _setPreviewEvents(
      events.map((event) => ({
        ...event,
        color: "GRAY",
        possible: true,
      }))
    );
  };

  // If section already in the plan is hover, set it to possible too so it jiggles
  const addSectionToPreview = (crn: string) => setSectionsInPlanPreview([crn]);
  const removeSectionsFromPreview = () => setSectionsInPlanPreview([]);

  return {
    previewEvents,
    setPreviewEvents,
    sectionsInPlanPreview,
    addSectionToPreview,
    removeSectionsFromPreview,
  };
};
