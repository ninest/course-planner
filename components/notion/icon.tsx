import { NotionIcon } from "@/notion/types";
import clsx from "clsx";
import { ComponentProps } from "react";

export function NotionIconDisplay({ icon, className }: { icon: NotionIcon } & ComponentProps<"div">) {
  let iconElement;
  switch (icon.type) {
    case "external":
      {
        iconElement = <img src={icon.external.url} className="opacity-80" />;
      }
      break;

    default:
      break;
  }

  return <div className={clsx(className)}>{iconElement}</div>;
}
