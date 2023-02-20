import { groupTermsByYear } from "@/utils/term/group";
import terms from "../.data/terms.json";

export default function HomePage() {
  const termsByYear = groupTermsByYear(terms);
  return (
    <main className="">
      <header className="border-b p-5 flex justify-between items-center">
        <h1 className="text-lg font-bold">Course Planner</h1>
        {/* <MenuButton items={terms.}>
          <Button intent={"primary"}>
            <Plus className="md:mr-2 w-5" />
            <span className="hidden md:block">New Plan</span>
          </Button>
        </MenuButton> */}
      </header>
      <div className="p-5 space-y-4">
        {termsByYear.map((group) => {
          return (
            <section key={group.year}>
              <h2 className="mb-1 font-bold">{group.year}</h2>
              <div>
                {group.terms.map((term) => {
                  const description = term.description
                    .split(" ")
                    .slice(0, -1)
                    .join(" ");
                  const year = term.description.split(" ").at(-1);

                  return (
                    <div key={term.code}>
                      <h3>
                        {description}{" "}
                        <span className="text-gray-400">{year}</span>
                      </h3>
                    </div>
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
