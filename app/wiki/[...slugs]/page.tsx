import { getBlocksChildrenList } from "@/api/notion";
import { NotionPage } from "@/components/notion/page";
import { TransparentHeader } from "@/components/sticky-transparent-header";
import { SubPageBackButton } from "@/components/sub-page-back-button";
import { getNotionPageMentions } from "@/notion/mentions";
import { getWikiArticleBySlug } from "@/notion/wiki";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const revalidate = 3600;

interface Props {
  params: { slugs: string[] };
}

export default async function WikiPage({ params }: Props) {
  const slug = params.slugs[0];
  const page = await getWikiArticleBySlug(slug);
  const pageBlocks = await getBlocksChildrenList(page.id);
  const pageMentions = await getNotionPageMentions(page.id);

  return (
    <>
      <TransparentHeader className="md:hidden sticky top-0 px-5 py-3">
        <SubPageBackButton href="/wiki" />
      </TransparentHeader>

      <div className="px-5 md:p-5 w-full md:mx-auto md:max-w-[75ch]">
        <article>
          <NotionPage blocks={pageBlocks.results as BlockObjectResponse[]} mentions={pageMentions} />
        </article>
      </div>
    </>
  );
}
