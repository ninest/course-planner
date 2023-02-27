export interface EventColor {
  name: string;
  className: string;
}

export const eventColorKeys = ["LIGHT_BLUE", "LIGHT_GREEN", "GRAY"] as const;
export type EventColorKey = typeof eventColorKeys[number];

export const eventColorsMap: Record<EventColorKey, EventColor> = {
  LIGHT_BLUE: {
    name: "Light blue",
    className: "bg-indigo-50 text-gray-600",
  },
  LIGHT_GREEN: {
    name: "Light green",
    className: "bg-green-50 text-gray-800",
  },
  GRAY: {
    name: "Gray",
    className: "bg-gray-200 text-gray-800",
  },
};

export const eventColors: EventColor[] = [
  eventColorsMap.LIGHT_BLUE,
  eventColorsMap.LIGHT_GREEN,
  eventColorsMap.GRAY,
];
