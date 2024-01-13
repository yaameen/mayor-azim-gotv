import React from "react";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

type SelectFieldProps = {
  label?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  inputClassName?: HTMLInputElement["className"];
} & React.InputHTMLAttributes<HTMLSelectElement>;
export default function SelectField({
  className,
  inputClassName,
  ...props
}: SelectFieldProps) {
  const { pending } = useFormStatus();
  return (
    <div>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <div
        className={twMerge(
          "flex rounded-md shadow-sm p-1 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md",
          className,
          props.prepend ? "pl-1" : "pl-3",
          props.append ? "pr-1" : "pr-3"
        )}
      >
        {props.prepend}

        <select
          disabled={pending}
          required
          {...props}
          className={twMerge(
            "block flex-1 outline-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6",
            inputClassName
          )}
        >
          <option value="">{props.placeholder || props.label}</option>
          {props.children}
        </select>

        {props.append}
      </div>
    </div>
  );
}
{
  /* <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
<span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
</div> */
}
