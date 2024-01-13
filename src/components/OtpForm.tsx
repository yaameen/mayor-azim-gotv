"use client";
import React from "react";
import Button from "./Button";
import { Logout, authorize, verifyOTP } from "@/actions/api";
import toast from "react-hot-toast";
import { notify } from "@/utils/toasts";

export default function OtpForm() {
  const [otp, setOtp] = React.useState("");
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const resp = await verifyOTP(otp);

          if (resp && "error" in resp) {
            // alert(resp.error);
            toast.error(resp.error, {
              position: "top-right",
            });
          }
        }}
      >
        <div className="my-6">
          <input
            type="number"
            pattern="[0-9]*"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="OTP"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            type="submit"
            className="px-4 rounded-lg text-white bg-red-700 hover:bg-red-500 py-2 my-2"
          >
            Authorize
          </Button>
          <Button
            className="px-4 rounded-lg text-white bg-purple-700 hover:bg-purple-500 py-2 my-2"
            onClick={async () => {
              await Logout();
            }}
          >
            Start Over
          </Button>
        </div>
      </form>
    </>
  );
}
