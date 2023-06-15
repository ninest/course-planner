import { LinkButton } from "@/components/link/link-button";
import { Title } from "@/components/title";
import { getLinks } from "@/notion/links";

export default async function LinksPage() {
  const links = await getLinks();

  return (
    <>
      <main className="p-5 md:max-w-[80ch] md:mx-auto">
        <Title>Links</Title>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* {links.map((courseLink) => {
            return <LinkButton href={courseLink.url} title={courseLink.title} />;
          })} */}
        </div>
      </main>
    </>
  );
}
