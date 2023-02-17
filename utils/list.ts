export const integersBetween = (min: number, max: number) => {
  return Array.from({ length: max - min + 1 }, (v, k) => k + min);
};

export const integerRange = (length: number) => {
  return Array.from({ length }, (x, i) => i);
};
