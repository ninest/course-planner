"use client";

import clsx from "clsx";
import { HTMLAttributes } from "react";
import { useController } from "react-hook-form";
import { FaCaretDown } from "react-icons/fa";

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
  label?: string;
  options: (Option | OptionGroup)[];
  displayPrefix?: string;
}

export function Select({ control, name, options, label, displayPrefix, className, ...props }: SelectProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const allOptions = options
    .map((option) => {
      if (option.type === "option") {
        return option;
      } else if (option.type === "optgroup") {
        return option.options;
      } else throw new Error("Invalid option");
    })
    .flat();
  const selectedOption = allOptions.find((option) => option.value === field.value);

  return (
    <fieldset className="">
      {label && (
        <label htmlFor={name} className="block font-semibold text-gray-600 mb-1">
          {label}
        </label>
      )}
      <div className="relative rounded focus-within:ring-2 ring-offset-2 ring-primary-100 dark:ring-primary-900">
        <select
          id={name}
          name={name}
          onChange={field.onChange}
          value={field.value}
          className={clsx("w-full top-0 opacity-0 absolute appearance-none focus:outline-none")}
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
        <label
          htmlFor={name}
          className={clsx(className, "z-10 block pointer-events-none", "flex justify-between items-center space-x-1")}
        >
          <span>
            {displayPrefix && <>{displayPrefix} </>}
            {selectedOption?.title}
          </span>
          <FaCaretDown />
        </label>
      </div>
    </fieldset>
  );
}
