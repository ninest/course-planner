import { Term } from "./type";

export const getValuesFromTerm = (term: Term) => {
  const description = term.description.split(" ").slice(0, -1).join(" ");
  const year = term.description.split(" ").at(-1);
  return { year, description };
};
