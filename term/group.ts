import { Term } from "./type";

interface Group {
  year: number;
  terms: Term[];
}

export const groupTermsByYear = (terms: Term[]) => {
  const groups: Group[] = [];

  for (const term of terms) {
    const yearStr = term.code.substring(0, 4);
    const yearNum = parseInt(yearStr);
    const group = groups.find((group) => group.year === yearNum);
    if (group) {
      group.terms.push(term);
    } else {
      groups.push({ year: yearNum, terms: [term] });
    }
  }

  return groups;
};
