import { authorize } from "@/actions/api";
import AuthorizeForm from "@/components/AuthorizeForm";
import Button from "@/components/Button";
import OtpForm from "@/components/OtpForm";
import { GetUser } from "@/utils/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

export const runtime = "edge";

async function getOTPSession() {
  const session = cookies().get("gotv_pre_session");
  return session;
}

export default async function Authorize() {
  const user = await GetUser();
  if (user) {
    return redirect("/");
  }
  const session = await getOTPSession();
  return (
    <div className="p-6 h-screen w-screen flex bg-blue-500 flex-col items-center justify-center">
      <div className="w-36 h-36 flex items-center justify-center border rounded-full bg-yellow-500 mb-6">
        <Image
          width={60}
          height={20}
          className="h-16  w-auto"
          src="/images/logo.png"
          alt="Male' City"
        />
      </div>
      <div className="text-4xl text-white mb-6 animate-pulse">GOTV</div>
      <div className="bg-white p-6 rounded-xl shadow border">
        <div className="text-left">
          <div className="font-semibold text-3xl">Identify yourself</div>
          <div className="flex flex-row text-sm font-medium text-gray-400">
            Please provide the mobile number you were provided with.
          </div>
        </div>
        {session ? <OtpForm /> : <AuthorizeForm />}
      </div>
      <div className="flex flex-row text-lg font-extralight  mt-10 text-yellow-100">
        MDP Male&apos; City By-Election 2023
      </div>
    </div>
  );
}
