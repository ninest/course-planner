export function integersBetween(min: number, max: number) {
  return Array.from({ length: max - min + 1 }, (v, k) => k + min);
}

export function integerRange(length: number) {
  return Array.from({ length }, (x, i) => i);
}

export function groupBy<T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) {
  return array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });
}

export function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)];
}
