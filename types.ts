import { EventColor } from "./utils/event/colors";

export interface Time {
  hour: number;
  minute: number;
}

export interface CalendarEvent {
  title: string;
  subtitle?: string;
  description?: string;
  day: number;
  startTime: Time;
  endTime: Time;
  color?: EventColor;
}
