import { eventColorsMap } from "@/utils/event/colors";
import { CalendarEvent } from "@/utils/event/types";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/navigation";

const previewEventsAtom = atom<CalendarEvent[]>([]);

export const useWeekView = () => {
  const [previewEvents, _setPreviewEvents] = useAtom(previewEventsAtom);
  const router = useRouter()

  // Set all preview events gray
  const setPreviewEvents = (events: CalendarEvent[]) => {
    _setPreviewEvents(
      events.map((event) => ({ ...event, color: eventColorsMap.GRAY }))
    );
  };

  return { previewEvents, setPreviewEvents };
};
