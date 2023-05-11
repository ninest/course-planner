import { Time } from "../utils/time/types";
import { EventColorKey } from "./colors";

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
