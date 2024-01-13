import { Transition, Dialog as HeadlessDialog } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export type DialogProps = {
  open: boolean;
  controlled?: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
  title: React.ReactNode;
  renderActions: (onClose: () => void) => React.ReactNode;
};
export default function Dialog(props: DialogProps) {
  const [open, setOpen] = useState<any>(props.open);

  useEffect(() => {
    setTimeout(() => setOpen(props.open), 10);
  }, [props.open]);

  return (
    <Transition.Root show={!!open} as={Fragment}>
      <HeadlessDialog
        static={props.controlled}
        as="div"
        className="relative z-10"
        onClose={() => {
          if (!props.controlled) {
            setOpen(null);
          }
          props.onClose();
        }}
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
              <HeadlessDialog.Panel
                className={twMerge(
                  "relative transform  rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8  sm:p-6",
                  props.className
                )}
              >
                <div>
                  <div className="">
                    <HeadlessDialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {props.title}
                    </HeadlessDialog.Title>
                    <div className="mt-2">{props.children}</div>
                  </div>
                </div>
                <div className="mt-5 flex gap-2 sm:mt-6">
                  <div className="flex-1"></div>

                  {props.renderActions &&
                    props.renderActions(() => setOpen(null))}
                  <button
                    type="button"
                    className="inline-flex gap-2 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      setOpen(false);
                      props.onClose();
                    }}
                  >
                    <XCircleIcon width={20} />
                    Close
                  </button>
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  );
}
