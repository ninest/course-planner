import { getLinksCategories } from "@/notion/categories";
import { getLinks } from "@/notion/links";
import { LinksDisplay } from "./links-display";

export default async function HubPage() {
  const categories = await getLinksCategories();
  const links = await getLinks();

  const [appCategory, ...otherCategories] = categories;
  return <LinksDisplay appCategory={appCategory} categories={otherCategories} links={links} />;
}
