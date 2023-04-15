import { Term } from "@/.data/types";

export async function getTerms() {
  const response = await fetch(`https://nu-courses/terms}`);

  if (!response.ok) throw new Error(`Error in fetching terms }`);

  const data: Term[] = await response.json();
  return data;
}

export async function getTerm(termCode: string) {
  const response = await fetch(`https://nu-courses/terms/${termCode}`);

  if (!response.ok) throw new Error(`Error in fetching term ${termCode}`);

  const data: Term = await response.json();
  return data;
}
