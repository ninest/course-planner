import { Button } from "@/components/button";
import { Plus } from "lucide-react";

export default function HomePage() {
  return (
    <main className="">
      <header className="border-b p-5 flex justify-between items-center">
        <h1 className="text-xl font-bold">Course Planner</h1>
        <Button intent={"primary"}>
          <Plus className="md:mr-2 w-5" />
          <span className="hidden md:block">New Plan</span>
        </Button>
      </header>
    </main>
  );
}
