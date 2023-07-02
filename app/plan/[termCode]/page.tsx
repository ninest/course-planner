interface TermPageProps {
  params: { termCode: string };
}

export default function TermPage({ params }: TermPageProps) {
  return <main className="p-5">Select a plan or create one.</main>;
}
