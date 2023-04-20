"use client";

import clsx from "clsx";
import { HTMLAttributes } from "react";

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  name: string;
  options: { title: string; value: string }[];
}

export function Select({ name, options, className, ...props }: SelectProps) {
  return (
    <>
      <select
        name={name}
        className={clsx("form-field focus:outline-none focus:border-2 appearance-none", className)}
        {...props}
      >
        {options.map((option) => {
          return <option key={option.value} value={option.value}>{option.title}</option>;
        })}
      </select>
    </>
  );
}
