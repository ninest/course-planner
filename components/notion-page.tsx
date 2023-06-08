"use client";

import { PageMention } from "@/notion/page";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import { UniversalLink } from "./universal-link";

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
  pageMentions: PageMention[];
}

export function NotionPage({ recordMap, pageMentions }: NotionPageProps) {
  const classes = "notion-page notion-h2 notion-h3 notion-hash-link notion-file notion-file-icon notion-file-size";
  return (
    <>
      <NotionRenderer
        recordMap={recordMap}
        components={{
          PageLink: (props: any) => {
            // Find from pageMentions
            const pageId = props.href.split("/")[1];
            const mention = pageMentions.find((mention) => mention.id === pageId)!;
            const searchParams = useSearchParams();

            let href = mention.href;
            if (mention.type === "course-link") href += `?${searchParams.toString()}`;
            return (
              <UniversalLink href={href} underline>
                {mention.title}
              </UniversalLink>
            );
          },
          nextLink: (props: any) => {
            return <Link {...props} />;
          },
          Link: (props: any) => {
            return (
              <UniversalLink href={props.href} underline>
                {props.children}
              </UniversalLink>
            );
          },
        }}
      />
    </>
  );
}
