import { EventColor, EventColorKey } from "../event/colors";
import { Time } from "../time/types";

export interface CalendarEvent {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  day: number;
  startTime: Time;
  endTime: Time;
  color?: EventColorKey;
  possible?: boolean; // event not confirmed
}
