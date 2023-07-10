"use client";

import { Title } from "@/components/title";
import { UniversalLink } from "@/components/universal-link";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { ReactNode } from "react";
import notionCommentInstructionsImage from "@/public/images/courses/notion-comment.png";
import { FaCross, FaTimes } from "react-icons/fa";

export function CourseContributeDialog({
  children,
  googleFormUrl,
  notionUrl,
}: {
  children: ReactNode;
  googleFormUrl: string;
  notionUrl: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-40 inset-0 bg-black/50" />
        <Dialog.Content className="fixed z-50 top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%]">
          <div className="bg-white p-5 rounded-xl shadow">
            <Dialog.Close asChild>
              <button className="text-gray-400">
                <FaTimes />
              </button>
            </Dialog.Close>
            <Dialog.Title asChild>
              <Title level={2} className="mb-3">
                Contribute
              </Title>
            </Dialog.Title>
            <Dialog.Description asChild>
              <div className="space-y-2">
                <p>Contribute by filling out a Google Form or commenting on a public Notion page:</p>
                <p>
                  <ul className="ml-8 list-disc">
                    <li>
                      <UniversalLink href={googleFormUrl} className="underline">
                        Google Form
                      </UniversalLink>
                    </li>
                    <li>
                      <UniversalLink href={notionUrl} className="underline">
                        Notion page
                      </UniversalLink>
                    </li>
                  </ul>
                </p>
                <p>
                  To contribute on Notion, click on the Notion page link above, then add a comment with your changes:
                </p>
                <p>
                  <Image src={notionCommentInstructionsImage} alt="Notion page comment button" className="rounded" />
                </p>
              </div>
            </Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
