"use client"

import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import { UniversalLink } from "./universal-link";

const buttonStyles = cva(["inline-flex tracking-wide font-medium", "rounded-lg", "border-2"], {
  variants: {
    variant: {
      primary: ["bg-primary-500 text-white hover:bg-primary-500 shadow-sm"],
      "primary-danger": ["bg-error-500 text-white hover:bg-error-500 shadow-sm"],
      secondary: ["bg-gray-100 text-gray-700 hover:bg-gray-300 shadow-sm"],
      "secondary-success": ["bg-primary-100 text-primary-700 hover:bg-primary-300 shadow-sm"],
      "secondary-danger": ["bg-error-100 text-error-700 hover:bg-error-300 shadow-sm"],
      ghost: ["bg-transparent text-gray-700 hover:bg-gray-100"],
    },
    outline: {
      true: "",
      false: "border-transparent",
    },
    size: {
      xs: ["text-xs py-0.5 px-1"],
      sm: ["text-sm py-1 px-3"],
      default: ["text-base py-1 px-3"],
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      outline: true,
      class: ["bg-transparent text-primary-600 border-primary-600 hover:bg-gray-100"],
    },
    { variant: "ghost", size: "default", class: "!p-0.5" },
  ],
  defaultVariants: {
    variant: "secondary",
    size: "default",
    outline: false,
  },
});

export type ButtonProps = VariantProps<typeof buttonStyles> &
  ComponentProps<"button"> & { href?: string; iconLeft?: ReactNode; iconRight?: ReactNode };
export const Button = ({
  variant: intent,
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
    buttonStyles({ variant: intent, outline, size })
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
      <UniversalLink href={href} className={classes}>
        {childrenElement}
      </UniversalLink>
    );
  return (
    <button className={classes} {...props}>
      {childrenElement}
    </button>
  );
};
