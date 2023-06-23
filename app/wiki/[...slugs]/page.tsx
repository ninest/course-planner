import { getBlocksChildrenList } from "@/api/notion";
import { NotionPage } from "@/components/notion/page";
import { TransparentHeader } from "@/components/sticky-transparent-header";
import { SubPageBackButton } from "@/components/sub-page-back-button";
import { Title } from "@/components/title";
import { getNotionPageMentions } from "@/notion/mentions";
import { getWikiArticleBySlug } from "@/notion/wiki";
import { formatDate } from "@/utils/date/display";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const revalidate = 1000;

interface Props {
  params: { slugs: string[] };
}

export default async function WikiPage({ params }: Props) {
  const slug = params.slugs[0];
  const page = await getWikiArticleBySlug(slug);
  const pageBlocks = await getBlocksChildrenList(page.id);
  const pageMentions = await getNotionPageMentions(page.id);

  const { metadata } = page;

  return (
    <>
      <TransparentHeader className="md:hidden sticky top-0 px-5 py-3">
        <SubPageBackButton href="/wiki" />
      </TransparentHeader>

      <div className="px-5 md:p-5 w-full md:mx-auto md:max-w-[75ch]">
        <Title level={1}>{page.title}</Title>
        <div className="mt-2">
          <p className="font-medium">{page.description}</p>
        </div>

        <hr className="mt-4" />

        <article className="mt-4">
          <NotionPage blocks={pageBlocks.results as BlockObjectResponse[]} mentions={pageMentions} />
        </article>

        {metadata && (
          <div className="my-10 text-sm p-3 border rounded-md">
            <p>Created {formatDate(metadata.createdAt)}</p>
            <p>Last edited {formatDate(metadata.lastEditedAt)}</p>
          </div>
        )}
      </div>
    </>
  );
}
