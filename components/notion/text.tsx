import { TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";

export function NotionText({ text }: { text: TextRichTextItemResponse[] }) {
  if (!text) return null;

  return text.map((value) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;

    const classes = clsx({
      "font-bold": bold,
      "font-mono": code,
      italic: italic,
      strikethrough: strikethrough,
      underline: underline,
    });

    return <span className={classes}>{text.link ? <a href={text.link.url}>{text.content}</a> : text.content}</span>;
  });
}
