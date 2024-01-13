"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

type InputFieldProps = {
  label?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  inputClassName?: HTMLInputElement["className"];
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
export default function InputField({
  className,
  inputClassName,
  ...props
}: InputFieldProps) {
  const { pending } = useFormStatus();
  return (
    <div className="w-full">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <div
        className={twMerge(
          "flex w-full rounded-md shadow-sm p-1 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600",
          className,
          props.prepend ? "pl-1" : "pl-3",
          props.append ? "pr-1" : "pr-3"
        )}
      >
        {props.prepend}
        {props.type == "textarea" ? (
          <textarea
            disabled={pending}
            {...props}
            className={twMerge(
              "block flex-1 outline-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6",
              inputClassName
            )}
          ></textarea>
        ) : (
          <input
            disabled={pending}
            {...props}
            className={twMerge(
              "block flex-1 outline-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6",
              inputClassName
            )}
          />
        )}

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
