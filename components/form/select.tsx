"use client";

import clsx from "clsx";
import { HTMLAttributes } from "react";
import { useController } from "react-hook-form";

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  control: any;
  name: string;
  options: { title: string; value: string }[];
}

export function Select({ control, name, options, className, ...props }: SelectProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <>
      <select
        id={name}
        name={name}
        onChange={field.onChange}
        value={field.value}
        className={clsx("form-field focus:outline-none focus:border-2 appearance-none", className)}
        {...props}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          );
        })}
      </select>
    </>
  );
}
