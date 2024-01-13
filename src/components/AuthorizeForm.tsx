"use client";
import React from "react";
import Button from "./Button";
import { authorize } from "@/actions/api";
import toast from "react-hot-toast";

export default function AuthorizeForm() {
  const [phone, setPhone] = React.useState("");
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { data, status } = await authorize(phone);

          if (data && "message" in data) {
            toast[status === 200 ? "success" : "error"](data.message, {
              position: "top-right",
            });
          }
        }}
      >
        <div className="my-6">
          <input
            type="number"
            pattern="[0-9]*"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Mobile number"
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-4 rounded-lg text-white bg-red-700 hover:bg-red-500 py-2 my-2"
          >
            Authorize
          </Button>
        </div>
      </form>
    </>
  );
}
