export const revalidate = 0; // no cache
export const dynamic = "force-static";

interface TermPageProps {
  params: { termCode: string };
}

export default async function TermPage({ params }: TermPageProps) {
  return <div className="p-5">Select a plan or create one!</div>;
}
