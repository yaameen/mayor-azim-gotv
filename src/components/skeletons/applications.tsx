import React, { Fragment } from "react";

export default function ApplicationSkeleton() {
  return (
    <Fragment>
      <li className="relative grid grid-cols-3  sm:grid-cols-5 justify-between gap-x-6 hover:bg-gray-50">
        <div className="min-w-0  border-l-8 flex items-center sm:gap-x-4 col-span-2 pl-4">
          <div className="min-w-0 flex-auto">
            <div className="text-sm font-semibold leading-6 text-gray-900">
              <a>
                <div className="bg-gray-300 w-[60%] h-6 m-2 animate-pulse rounded-lg"></div>
              </a>
            </div>
            <div className="text-xs leading-5 text-gray-500">
              <div className="bg-gray-300  w-[85%] h-4 m-2 animate-pulse rounded-lg"></div>
              <div>
                <div className="bg-gray-300 w-[45%] h-4 m-2 animate-pulse rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-start justify-center">
          <div className="bg-gray-300 w-[60%] h-6 m-2 animate-pulse rounded-lg"></div>
        </div>
        <div className="hidden sm:flex flex-col items-start justify-center">
          <div className="bg-gray-300 w-[60%] h-6 m-2 animate-pulse rounded-lg"></div>
        </div>

        <div className="flex justify-end shrink-0 items-center gap-x-2 pr-4">
          <div className="bg-gray-300 h-8 w-8 rounded-full m-2 animate-pulse"></div>
        </div>
      </li>
      <li className="relative grid grid-cols-3  sm:grid-cols-5 justify-between gap-x-6 hover:bg-gray-50">
        <div className="min-w-0  border-l-8 flex items-center sm:gap-x-4 col-span-2 pl-4">
          <div className="min-w-0 flex-auto">
            <div className="text-sm font-semibold leading-6 text-gray-900">
              <a>
                <div className="bg-gray-300 w-[60%] h-6 m-2 animate-pulse rounded-lg"></div>
              </a>
            </div>
            <div className="text-xs leading-5 text-gray-500">
              <div className="bg-gray-300  w-[85%] h-4 m-2 animate-pulse rounded-lg"></div>
              <div>
                <div className="bg-gray-300 w-[45%] h-4 m-2 animate-pulse rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-start justify-center">
          <div className="bg-gray-300 w-[60%] h-6 m-2 animate-pulse rounded-lg"></div>
        </div>
        <div className="hidden sm:flex flex-col items-start justify-center">
          <div className="bg-gray-300 w-[60%] h-6 m-2 animate-pulse rounded-lg"></div>
        </div>

        <div className="flex justify-end shrink-0 items-center gap-x-2 pr-4">
          <div className="bg-gray-300 h-8 w-8 rounded-full m-2 animate-pulse"></div>
        </div>
      </li>
    </Fragment>
  );
}
