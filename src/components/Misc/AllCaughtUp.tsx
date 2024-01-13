import React from "react";

export default function AllCaughtUp() {
  return (
    <div className="flex items-center justify-center gap-4 py-6 border my-6 rounded-xl">
      <div className="flex items-center justify-center">
        <div className=" flex items-center justify-center  h-12 w-12  rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            ></path>
          </svg>
        </div>
      </div>
      <div className="">
        <h3
          className="text-base font-semibold leading-6 text-gray-900"
          id="modal-title"
        >
          All caught up!
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            You have covered it all. Or your search query yielded no results.
          </p>
        </div>
      </div>
    </div>
  );
}
