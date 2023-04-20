import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  wrapperClassName?: string;
  inputClassName?: string;
}

export function FormField({ control, name, wrapperClassName, inputClassName, ...props }: FormFieldProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const fieldProps = {
    name,
    id: name,
    placeholder: props.placeholder,
    required: props.required,
    value: field.value || "",
    onChange: (e: any) => field.onChange(e.target.value),
  };

  return (
    <fieldset className={clsx(wrapperClassName)}>
      {/* TODO: label */}
      {/* TODO: description */}
      <input type={props.type} className={clsx(inputClassName, "block form-field")} {...props} {...fieldProps} />
      {/* TODO: textarea instead of input */}
      {/* TODO: error */}
    </fieldset>
  );
}
