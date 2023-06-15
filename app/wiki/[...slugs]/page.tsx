import { getWikiArticleBlocks } from "@/notion/wiki";

interface Props {
  params: { slugs: string[] };
}

export default async function WikiPage({ params }: Props) {
  const pageBlocks = await getWikiArticleBlocks(params.slugs[0]);
  return <div>{params.slugs}</div>;
}
