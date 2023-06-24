import { getBlock } from "@/api/notion";
import { PageMention } from "@/notion/mentions";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { ComponentProps } from "react";
import { Blockquote } from "../Blockquote";
import { Callout } from "../Callout";
import { Title } from "../title";
import { NotionText } from "./text";

export async function NotionPage({ blocks, mentions }: { blocks: BlockObjectResponse[]; mentions: PageMention[] }) {
  return (
    <article className="leading-relaxed">
      {blocks.map((block, i) => {
        const isListItem = block.type === "bulleted_list_item" || block.type === "numbered_list_item";
        const isTitle = block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3";
        const noSpaceBelow =
          (block.type === "bulleted_list_item" && blocks[i + 1]?.type === "bulleted_list_item") ||
          (block.type === "numbered_list_item" && blocks[i + 1]?.type === "numbered_list_item");
        return (
          <div key={block.id} className={clsx({ "mb-3": !noSpaceBelow && !isTitle, "mb-2": isTitle })}>
            {isListItem ? (
              <ul className="list-disc list-outside ml-6">
                {/* @ts-ignore */}
                <NotionBlock block={block} mentions={mentions} />
              </ul>
            ) : (
              // @ts-ignore
              <NotionBlock block={block} mentions={mentions} />
            )}
          </div>
        );
      })}
    </article>
  );
}

export async function NotionBlock({ block, mentions }: { block: BlockObjectResponse; mentions: PageMention[] }) {
  const { type, id } = block;
  // @ts-ignore
  const value = block[type];

  const notionText = <NotionText text={value} mentions={mentions} />;

  switch (type) {
    case "paragraph":
      return <p>{notionText}</p>;
    case "heading_1":
    case "heading_2":
      return <Title level={2}>{notionText}</Title>;
    case "heading_3":
      return <Title level={3}>{notionText}</Title>;
    case "bulleted_list_item":
    case "numbered_list_item":
      return <li>{notionText}</li>;
    case "callout":
      // TODO: check emoji for other callout types
      const emoji = block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : null;
      let calloutType: ComponentProps<typeof Callout>["type"] = "default";
      if (emoji === "⚠️") calloutType = "warning";
      if (emoji === "🔴") calloutType = "error";
      return <Callout type={calloutType}>{notionText}</Callout>;
    case "toggle":
      // TODO: need to get block children
      return <></>;
    case "quote":
      return <Blockquote>{notionText}</Blockquote>;
    case "image":
      // @ts-ignore
      const b = await getBlock(block.id);
      // @ts-ignore
      const src = b.image.file.url;
      return (
        <figure>
          <img src={src} alt={"Image"} />
        </figure>
      );

    default:
      return <p className="text-red-500">Warning: {type} is unsupported.</p>;
  }
}
