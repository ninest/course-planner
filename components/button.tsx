import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

const buttonStyles = cva(["inline-flex tracking-wide", "rounded-md", "border-2"], {
  variants: {
    intent: {
      primary: ["bg-primary-600 text-white hover:bg-primary-500 shadow-sm"],
      secondary: ["bg-gray-100 text-gray-800 hover:bg-gray-300 shadow-sm"],
      tonal: ["bg-primary-100 text-gray-800 hover:bg-gray-300 shadow-sm"],
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
    danger: {},
  },
  compoundVariants: [
    {
      intent: "primary",
      outline: true,
      class: ["bg-transparent text-primary-600 border-primary-600 hover:bg-gray-100"],
    },
    { intent: "ghost", size: "default", class: "!p-0.5" },
  ],
  defaultVariants: {
    intent: "secondary",
    size: "default",
    outline: false,
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> &
  ComponentProps<"button"> & { href?: string; iconLeft?: ReactNode; iconRight?: ReactNode };
export const Button = ({
  intent,
  outline,
  size,
  href,
  children,
  iconLeft,
  iconRight,
  className,
  ...props
}: ButtonProps) => {
  const classes = clsx(
    "flex items-center justify-center space-x-3",
    className,
    buttonStyles({ intent, outline, size })
  );
  const childrenElement = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );
  if (href)
    return (
      <Link href={href} className={classes}>
        {childrenElement}
      </Link>
    );
  return (
    <button className={classes} {...props}>
      {childrenElement}
    </button>
  );
};
