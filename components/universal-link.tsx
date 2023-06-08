import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes } from "react";

export interface UniversalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: LinkProps["href"] | string;
  underline?: boolean;
  activeClassName?: string;
  exactPath?: boolean; // Does the exact path have to match for activeClassName to apply?
}

export const UniversalLink = ({
  href,
  activeClassName,
  underline = false,
  exactPath = true,
  ...props
}: UniversalLinkProps) => {
  const pathname = usePathname();
  const path = pathname.split("?")[0];

  const isMatch = path.startsWith(href as string);
  const isExactMatch = path === href;

  const className = clsx(
    {
      underline,
      [`${activeClassName}`]: (!exactPath && isMatch) || (exactPath && isExactMatch),
    },
    props.className
  );

  if (typeof href === "string") {
    if (href[0] === "/" || href[0] === "#")
      return (
        <Link {...props} href={href} className={className}>
          {props.children}
        </Link>
      );
    else return <a {...props} className={className} href={href} target="_blank" rel="noreferrer" />;
  } else {
    /* href is not a string, it's a URL param object */
    return (
      <Link href={href}>
        <a {...props} className={className} />
      </Link>
    );
  }
};
