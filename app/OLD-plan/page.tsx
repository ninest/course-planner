import { groupTermsByYear } from "@/utils/term/group";
import { getValuesFromTerm } from "@/utils/term/string";
import Link from "next/link";
import terms from "../../.data/terms.json";

export default function HomePage() {
  const termsByYear = groupTermsByYear(terms);
  return (
    <main className="">
      <header className="border-b p-5 flex justify-between items-center">
        <h1 className="text-lg font-bold">Course Planner</h1>
      </header>
      <div className="p-5 space-y-4">
        {termsByYear.map((group) => {
          return (
            <section key={group.year}>
              <h2 className="mb-1 font-bold">{group.year}</h2>
              <div>
                {group.terms.map((term) => {
                  const { description, year } = getValuesFromTerm(term);

                  return (
                    <Link href={`/plan/${term.code}`} key={term.code} className="block hover:underline">
                      <h3>
                        {description} <span className="text-gray-400">{year}</span>
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
