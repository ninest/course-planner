import { EventColor } from "../event/colors";
import { Time } from "../time/types";

export interface CalendarEvent {
  title: string;
  subtitle?: string;
  description?: string;
  day: number;
  startTime: Time;
  endTime: Time;
  color?: EventColor;
  possible?: boolean; // event not confirmed
}
