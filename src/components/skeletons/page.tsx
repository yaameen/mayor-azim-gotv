import React from "react";

const randomWidth = (min = 0, max = 100) =>
  `${Math.floor(Math.random() * (max - min)) + min}%`;

const ListItemSkeleton = () => {
  return (
    <li className="relative grid grid-cols-3 justify-between gap-x-6 hover:bg-gray-50 sm:grid-cols-5">
      <div className="col-span-2 space-y-1 min-w-0 items-center pl-4 sm:gap-x-4">
        <div
          style={{ width: randomWidth() }}
          className={`h-8 bg-gray-400 rounded-lg animate-pulse`}
        ></div>
        <div
          style={{ width: randomWidth() }}
          className="h-4 bg-gray-400 rounded-lg animate-pulse"
        ></div>
      </div>
      <div className="hidden space-y-1 flex-col flex-wrap items-start justify-center sm:flex">
        <div
          style={{ width: randomWidth() }}
          className="h-6 bg-gray-400 rounded-lg animate-pulse"
        ></div>
        <div
          style={{ width: randomWidth() }}
          className="h-4 bg-gray-400 rounded-lg animate-pulse"
        ></div>
      </div>
      <div className="hidden space-y-1 flex-col flex-wrap items-start justify-center sm:flex">
        <div
          style={{ width: randomWidth() }}
          className="h-6 bg-gray-400 rounded-lg animate-pulse"
        ></div>
        <div
          style={{ width: randomWidth() }}
          className="h-4 bg-gray-400 rounded-lg animate-pulse"
        ></div>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-x-2 pr-4">
        <div className="text-right">
          <div className="h-6 w-6 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </li>
  );
};

export default function PageSkeleton() {
  return (
    <div>
      <div className="flex justify-between p-5">
        <div className="pl-4 w-[calc(100%)]">
          <div className="text-xl text-gray-800 mb-2">
            <div className="h-8 w-[calc(30%)] bg-gray-400 rounded-lg animate-pulse"></div>
          </div>
          <div className="text-sm text-gray-500">
            <div className="h-6 w-[calc(60%)] bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-1 w-32 animate-pulse rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"></div>
      </div>

      <div className="space-y-2 px-6 my-6">
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </div>
    </div>
  );
}
