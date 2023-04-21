"use client";

import clsx from "clsx";
import { HTMLAttributes } from "react";
import { useController } from "react-hook-form";

interface Option {
  type: "option";
  title: string;
  value: string;
}
interface OptionGroup {
  type: "optgroup";
  name: string;
  options: Option[];
}

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  control: any;
  name: string;
  options: (Option | OptionGroup)[];
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
        {options.map((option, index) => {
          if (option.type === "optgroup")
            return (
              <optgroup key={index} label={option.name}>
                {option.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.title}
                  </option>
                ))}
              </optgroup>
            );
          else
            return (
              <option key={index} value={option.value}>
                {option.title}
              </option>
            );
          // r;
        })}
      </select>
    </>
  );
}
