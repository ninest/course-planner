export interface Time {
  hour: number;
  minute: number;
}

export interface CalendarEvent {
  name: string;
  day: number;
  startTime: Time;
  endTime: Time;
}
