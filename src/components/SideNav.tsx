import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { Logout, refreshSession } from "@/actions/api";
import Button from "./Button";
import toast from "react-hot-toast";

export default function SideNav({ children, user }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <div className="">
          <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex-auto flex items-center">
                <div className="flex gap-2 items-center">
                  <img src="/images/logo.png" className="w-16" />
                  <div>GOTV</div>
                </div>
              </div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                      alt=""
                    />
                    <span className="hidden text-left lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        <div className="text-gray-800">{user?.name}</div>
                        <div className="text-gray-500 text-xs">
                          {user?.phone}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {user?.current?.name}
                        </div>
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <div className="p-3 border-b">
                        <div className="text-xs -mb-2 font-semibold leading-6 text-gray-500">
                          Name
                        </div>
                        <div>{user?.name}</div>

                        <div className="text-xs -mb-2 font-semibold leading-6 text-gray-500">
                          Phone
                        </div>
                        <div>{user?.phone}</div>
                        <div className="text-xs -mb-2 font-semibold leading-6 text-gray-500">
                          Your Role
                        </div>
                        <div>{user?.role}</div>
                        <div className="text-xs -mb-2 font-semibold leading-6 text-gray-500">
                          Your Box
                        </div>
                        <div>{user?.box?.name}</div>
                      </div>
                      <div className="p-2 flex gap-2">
                        <Menu.Item>
                          {({ close }) => (
                            <>
                              <Button
                                onClick={() => {
                                  close();
                                  Logout();
                                }}
                                className="bg-blue-800 text-white rounded-md w-full hover:bg-blue-700 gap-2 px-4 py-2 "
                              >
                                <ArrowRightCircleIcon width={20} />
                                Logout
                              </Button>
                            </>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
