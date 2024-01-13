import { FaceSmileIcon } from "@heroicons/react/20/solid";
import React from "react";

export default function Empty() {
  return (
    <div className="max-w-4xl mx-auto px-10 py-4 ">
      <div className="flex flex-col justify-center items-center py-12">
        <FaceSmileIcon className="w-24 h-24 text-gray-500 mb-4" width={60} />
        <p className="text-xl font-semibold text-gray-600 mb-2">
          This list is empty
        </p>
        <p className="text-gray-500 text-center mb-6">
          Either you do not have an unattached list or your search did not find
          any results.
        </p>
      </div>
    </div>
  );
}
