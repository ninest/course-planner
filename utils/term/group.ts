import { Term } from "./type";

interface Group {
  year: string;
  terms: Term[];
}

export const groupTermsByYear = (terms: Term[]) => {
  const groups: Group[] = [];

  for (const term of terms) {
    const year = term.code.substring(0, 4);
    const group = groups.find((group) => group.year === year);
    if (group) {
      group.terms.push(term);
    } else {
      groups.push({ year, terms: [term] });
    }
  }

  return groups;
};
