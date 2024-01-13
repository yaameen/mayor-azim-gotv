import React from "react";

type WhenProps = {
  title: string;
  helperText?: React.ReactNode;
  children: React.ReactNode;
  condition?: boolean;
  onShown?: () => void;
  onHidden?: () => void;
};
export default function When({
  children,
  condition = false,
  ...props
}: WhenProps) {
  const [show, setShow] = React.useState(condition);
  return (
    <>
      <div className="flex">
        <div className="flex items-center h-5">
          <input
            id={props.title || "helper-checkbox"}
            aria-describedby="helper-checkbox-text"
            type="checkbox"
            checked={show}
            onChange={(e) => {
              setShow(e.target.checked);
              if (e.target.checked) {
                props.onShown?.();
              } else {
                props.onHidden?.();
              }
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="ms-2 text-sm">
          <label
            htmlFor={props.title}
            className="font-medium text-gray-900 select-none"
          >
            {props.title}
            {props.helperText && (
              <p
                id="helper-checkbox-text"
                className="text-xs font-normal text-gray-500 "
              >
                {props.helperText}
              </p>
            )}
          </label>
        </div>
      </div>

      {show && children}
    </>
  );
}
