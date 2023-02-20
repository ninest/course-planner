export interface EventColor {
  name: string;
  className: string;
}

export const LIGHT_BLUE: EventColor = {
  name: "Light blue",
  className: "bg-indigo-50 text-gray-600",
};
const LIGHT_GREEN = {
  name: "Light green",
  className: "bg-green-50 text-gray-800",
};

export const eventColors: EventColor[] = [LIGHT_BLUE, LIGHT_GREEN];
