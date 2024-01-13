import { useField, useFormikContext } from "formik";
import React from "react";
import { FormFieldProps } from "../Form.component";
import { twMerge } from "tailwind-merge";

type CheckProps = {
  children?: React.ReactNode;
  className?: string;
  options: {
    [key: string]: any;
  };
};
export default function Check(props: CheckProps & FormFieldProps) {
  const { errors, values } = useFormikContext<any>();
  const [_field, _meta, _helpers] = useField(props.name);
  return (
    <div>
      <label
        htmlFor={props.name}
        className={`block text-sm ${
          props.name in errors ? "text-red-800" : "text-gray-600"
        }`}
      >
        {props.label}
      </label>
      <div className="flex gap-2 mt-2">
        {props.options?.map((i: any) => (
          <>
            <div
              className={twMerge(
                "bg-gray-50 rounded-lg px-2 border cursor-pointer hover:bg-gray-200",
                i.value == _field.value
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : null
              )}
              onClick={() => _helpers.setValue(i.value)}
            >
              {i.label}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
