export const hourToCalendarDisplay = (hour: number) => {
  if (hour === 12) return `12:00 PM`;
  if (hour > 12) {
    return `${String(hour - 12).padStart(2, "0")}:00 PM`;
  } else {
    return `${String(hour).padStart(2, "0")}:00 AM`;
  }
};
