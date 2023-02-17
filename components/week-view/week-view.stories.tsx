import { WeekView } from "@/components/week-view/week-view";

export const WeekViewBasicDemo = () => {
  return (
    <>
      <WeekView
        events={[
          {
            day: 2,
            name: "Tuesday Morning",
            startTime: { hour: 9, minute: 0 },
            endTime: { hour: 10, minute: 0 },
          },
          {
            day: 4,
            name: "Thursday Morning",
            startTime: { hour: 9, minute: 0 },
            endTime: { hour: 10, minute: 0 },
          },
          {
            day: 1,
            name: "Monday Afternoon",
            startTime: { hour: 12, minute: 5 },
            endTime: { hour: 13, minute: 15 },
          },
          {
            day: 3,
            name: "Wednesday Afternoon",
            startTime: { hour: 12, minute: 35 },
            endTime: { hour: 13, minute: 55 },
          },
          {
            day: 3,
            name: "Early morning lab",
            startTime: { hour: 8, minute: 0 },
            endTime: { hour: 9, minute: 0 },
          },
          {
            day: 3,
            name: "Another morning lab",
            startTime: { hour: 9, minute: 15 },
            endTime: { hour: 11, minute: 15 },
          },
        ]}
      />
    </>
  );
};
