import { Title } from "@/components/title";
import clsx from "clsx";
import { ComponentProps } from "react";
import { FaCaretRight } from "react-icons/fa";

export function SearchNotes({
  searchNotesOpen = false,
  className,
}: { searchNotesOpen?: boolean } & ComponentProps<"div">) {
  return (
    <div className="space-y-5">
      <details open={searchNotesOpen}>
        <summary className="list-none">
          <div className="flex items-center space-x-2">
            <Title level={3} className="">
              Search tips
            </Title>
            <FaCaretRight />
          </div>
        </summary>
        <ul className={clsx("mt-1 text-sm space-y-2")}>
          <li>
            Search for a subject code to view all courses in that subject. Search for <SearchTerm>CS</SearchTerm> to
            view all computer science courses.
          </li>

          <li>
            Search for a subject code followed by a number to filter searches by course numbers. Search for{" "}
            <SearchTerm>CS 25</SearchTerm> to view all CS 25XX courses (CS 2500, CS 2501, CS 2510, CS 2511, etc.).
          </li>

          <li>
            Search for a subject code followed by a query to filter by course names. Search for{" "}
            <SearchTerm>CS system</SearchTerm> to search for a computer science course with "system" in the name.
          </li>
        </ul>
      </details>
      <details>
        <summary className="list-none">
          <div className="flex items-center space-x-2">
            <Title level={3} className="">
              Contribute
            </Title>
            <FaCaretRight />
          </div>
        </summary>
        <div className={clsx("mt-1 text-sm space-y-2")}>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdIzBLNUhuc1OMyPCPAKwDBo4gpvqcK78OY9yaoCoJ3YMxTkQ/viewform"
            target="_blank"
          >
            {/* To contribute, please fill out <span className="underline">this form</span>. */}
            To contribute, please search for a class, then click on the "contribute" button on the page.
          </a>
        </div>
      </details>
    </div>
  );
}

function SearchTerm({ children }: ComponentProps<"span">) {
  return <span className="font-mono font-bold">{children}</span>;
}
