import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import Button, { ButtonProps } from "./Button";

export default function GroupAction({ children }: any) {
  if (!children) return null;

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center bg-gray-200 hover:bg-gray-400 w-8 h-8 rounded-full justify-center  text-sm font-medium hover:scale-105 text-gray-600 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <EllipsisVerticalIcon width={20} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50  right-0 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {children}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export const GroupActionItem = ({ children, ...props }: ButtonProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Button
          {...props}
          className={`${
            active ? "bg-gray-500 text-white" : "text-gray-900"
          } group flex gap-2 w-full items-center  px-3 py-3 text-sm`}
        >
          {children}
        </Button>
      )}
    </Menu.Item>
  );
};
