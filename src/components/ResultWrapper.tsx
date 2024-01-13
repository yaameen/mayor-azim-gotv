"use client";
import React from "react";
import ResultModal from "./ResultModal";
import Button from "./Button";
import { getResults } from "@/actions/govt";

type ResultWrapperProps = {
  box: {
    id: string | number;
    code: string;
    name: string;
  };
};

export default function ResultWrapper(props: ResultWrapperProps) {
  const [open, setOpen] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<any>(null);
  return (
    <div>
      <ResultModal open={open} />

      <Button
        className="items-center relative inline-flex gap-2 justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        loading={loading}
        onClick={() => {
          setLoading(true);
          getResults(props.box.id as string)
            .then((data) => {
              console.log({ data });

              setOpen({
                ...props.box,
                ...data,
              });
            })
            .finally(() => setLoading(false));
        }}
      >
        Results
      </Button>
    </div>
  );
}
