"use client";
import React, { ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  confirm?: boolean;
  controlled?: boolean;
  confirmTitle?: string;
  confirmBody?: ReactNode;
  renderForm?: (cb: () => void) => ReactNode;
  confirmActionName?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cb?: () => void
  ) => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export default function Button(props: ButtonProps) {
  const [confirm, setConfirm] = React.useState(false);

  const {
    children,
    className,
    confirm: C,
    confirmTitle,
    confirmBody,
    renderForm,
    confirmActionName,
    onClick,
    ...rest
  } = props;
  return (
    <>
      {props.confirm && (
        <ConfirmDialog
          controlled={props.controlled}
          title={props.confirmTitle || "Are you sure you want to do this?"}
          body={
            renderForm ? renderForm(() => setConfirm(false)) : props.confirmBody
          }
          actionName={props.confirmActionName || "Confirm"}
          onClose={(e: any, cb?: () => void) => {
            setConfirm(false);
            if (e) {
              props.onClick?.(e, cb);
            }
          }}
          shown={confirm}
        />
      )}
      <button
        type={rest.type || "button"}
        {...rest}
        className={twMerge(
          "flex items-center text-sm font-semibold relative",
          props.className
        )}
        onClick={(e) => {
          e.stopPropagation();
          if (props.confirm) {
            // if (confirm("Are you sure?")) {
            //   e.preventDefault();
            //   props.onClick?.(e);
            // }
            setConfirm(true);
            // if (props.controlled) {
            //   props.onClick?.(e, () => setConfirm(false));
            // }
          } else {
            props.onClick?.(e);
          }
        }}
      >
        {props.loading && (
          <div className="absolute inset-1 bg-inherit flex items-center justify-center">
            <svg
              className=""
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                opacity=".25"
                fill="currentColor"
              />
              <circle
                fill="currentColor"
                className="spinner"
                cx="12"
                cy="2.5"
                r="1.5"
              />
            </svg>
          </div>
        )}
        {props.children}
      </button>
    </>
  );
}

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type ConfirmDialogProps = {
  onClose: (e: any, cb?: () => void) => void;
  shown: any;
  title: string;
  body: ReactNode;
  controlled?: boolean;
  actionName: string;
};
export function ConfirmDialog({
  shown,
  onClose,
  title,
  body,
  controlled,
  actionName,
}: ConfirmDialogProps) {
  const [open, x] = useState(shown);

  useEffect(() => {
    x(shown);
  }, [shown]);

  const cancelButtonRef = useRef(null);

  const setOpen = (e: any) => {
    x(e);
    onClose?.(e);
  };

  const Confirm = (e: any) => {
    if (!controlled) {
      setOpen(false);
      x(false);
    }
    onClose?.(!!e, () => {
      x(false);
      setOpen(false);
    });
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative overflow-hidden transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 flex-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {title}
                        </Dialog.Title>
                        <div className="mt-2 w-full">{body}</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={(e) => Confirm(e)}
                    >
                      {actionName}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
