import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";

const buttonStyles = cva(
  ["inline-flex tracking-wide", "rounded-md", "border-2"],
  {
    variants: {
      intent: {
        primary: ["bg-primary-600 text-white hover:bg-primary-500"],
        secondary: ["bg-gray-200 text-gray-800 hover:bg-gray-300"],
        ghost: ["bg-transparent text-gray-800 hover:bg-gray-100"],
      },
      outline: {
        true: "",
        false: "border-transparent",
      },
      size: {
        xs: ["text-xs py-0.5 px-1"],
        sm: ["text-sm py-1 px-3"],
        default: ["text-base py-1 px-5"],
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        outline: true,
        class: [
          "bg-transparent text-primary-600 border-primary-600 hover:bg-gray-100",
        ],
      },
      { intent: "ghost", size: "default", class: "!p-0.5" },
    ],
    defaultVariants: {
      intent: "secondary",
      size: "default",
      outline: false,
    },
  }
);

type ButtonProps = VariantProps<typeof buttonStyles> &
  ComponentProps<"button"> & { href?: string };
export const Button = ({
  intent,
  outline,
  size,
  href,
  children,
  className,
  ...props
}: ButtonProps) => {
  const classes = clsx(className, buttonStyles({ intent, outline, size }));
  if (href)
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
