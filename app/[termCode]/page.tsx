import { BackButton } from "@/components/back-button";
import { getValuesFromTerm } from "@/utils/term/string";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import terms from "../../.data/terms.json";
import { Plus } from "lucide-react";
interface TermPageProps {
  params: { termCode: string };
}
export default async function TermPage({ params }: TermPageProps) {
  const term = terms.find((term) => term.code === params.termCode);
  if (!term) throw Error("Invalid term");

  const { year, description } = getValuesFromTerm(term);

  return (
    <main>
      <div className="px-5 pt-5">
        <BackButton />
      </div>
      <Tabs defaultValue="1">
        <header className="px-5 pt-5">
          <div className="md:flex md:space-x-5">
            <h1 className="font-bold text-lg">
              {description} <span className="text-gray-600">{year}</span>
            </h1>
            <TabsList>
              <TabsTrigger value="1">First</TabsTrigger>
              <TabsTrigger value="2">Second</TabsTrigger>
              <button className="inline-flex items-center h-7 py-1 px-3 text-sm bg-gray-100 rounded-md hover:bg-gray-200">
                <Plus className="w-3" />
              </button>
            </TabsList>
          </div>
        </header>
        <div className="p-5">
          <TabsContent value="1">one</TabsContent>
          <TabsContent value="2">two</TabsContent>
        </div>
      </Tabs>
    </main>
  );
}
