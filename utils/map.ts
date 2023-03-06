// Get a combined list of all the values in a map of { T : U[] }
// Returns a list of U
export const allMapValues = <T, U>(map: Map<T, U[]>): U[] => {
  const combinedListOfValues = Array.from(map.values()).flat();
  return combinedListOfValues;
};
