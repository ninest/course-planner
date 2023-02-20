import { WeekView } from "@/components/week-view/week-view";

export const WeekViewBasicDemo = () => {
  return (
    <>
      <WeekView
        events={[
          {
            day: 2,
            title: "Tuesday Morning",
            startTime: { hour: 9, minute: 0 },
            endTime: { hour: 10, minute: 0 },
          },
          {
            day: 4,
            title: "Thursday Morning",
            subtitle: "Optional subtitle",
            startTime: { hour: 9, minute: 0 },
            endTime: { hour: 10, minute: 0 },
          },
          {
            day: 1,
            title: "Monday Afternoon",
            startTime: { hour: 12, minute: 5 },
            endTime: { hour: 13, minute: 15 },
          },
          {
            day: 3,
            title: "Wednesday Afternoon",
            startTime: { hour: 12, minute: 35 },
            endTime: { hour: 13, minute: 55 },
          },
          {
            day: 3,
            title: "Early morning lab",
            startTime: { hour: 8, minute: 0 },
            endTime: { hour: 9, minute: 0 },
          },
          {
            day: 3,
            title:
              "Another morning lab with a super long title that may ruin the appearance of this class, but it is all for demonstration purposes so it is all okay and no harm is done",
            startTime: { hour: 9, minute: 15 },
            endTime: { hour: 11, minute: 15 },
          },
        ]}
      />
    </>
  );
};

export const WeekViewWithConflicts = () => {
  return (
    <>
      <WeekView
        events={[
          {
            day: 3,
            title: "Wednesday Morning",
            startTime: { hour: 9, minute: 0 },
            endTime: { hour: 10, minute: 0 },
          },
          {
            day: 3,
            title: "Wednesday Afternoon",
            startTime: { hour: 11, minute: 30 },
            endTime: { hour: 12, minute: 30 },
          },
          {
            day: 3,
            title: "Surprise class",
            startTime: { hour: 12, minute: 0 },
            endTime: { hour: 13, minute: 30 },
          },
        ]}
      />
    </>
  );
};
