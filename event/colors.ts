export interface EventColor {
  name: string;
  className: string;
}

export const eventColorKeys = [
  "LIGHT_BLUE",
  "LIGHT_GREEN",
  "LIGHT_YELLOW",
  "LIGHT_ORANGE",
  "LIGHT_PURPLE",
  "LIGHT_PINK",
  "GRAY",
] as const;
export type EventColorKey = typeof eventColorKeys[number];

// everything except gray
export const availableColorKeys: EventColorKey[] = [
  "LIGHT_BLUE",
  "LIGHT_GREEN",
  "LIGHT_YELLOW",
  "LIGHT_ORANGE",
  "LIGHT_PURPLE",
  "LIGHT_PINK",
];

export const eventColorsMap: Record<EventColorKey, EventColor> = {
  LIGHT_BLUE: {
    name: "Light blue",
    className: "bg-primary-50 text-primary-600",
  },
  LIGHT_GREEN: {
    name: "Light green",
    className: "bg-green-50 text-green-800",
  },
  LIGHT_YELLOW: {
    name: "Light yellow",
    className: "bg-yellow-50 text-yellow-800",
  },
  LIGHT_ORANGE: {
    name: "Light orange",
    className: "bg-orange-50 text-orange-800",
  },
  LIGHT_PURPLE: {
    name: "Light purple",
    className: "bg-purple-50 text-purple-800",
  },
  LIGHT_PINK: {
    name: "Light purple",
    className: "bg-pink-50 text-pink-800",
  },
  GRAY: {
    name: "Gray",
    className: "bg-gray-200 text-gray-800 dark:bg-gray-500 dark:text-gray-950",
  },
};

export const eventColors: EventColor[] = [
  eventColorsMap.LIGHT_BLUE,
  eventColorsMap.LIGHT_GREEN,
  eventColorsMap.GRAY,
];
