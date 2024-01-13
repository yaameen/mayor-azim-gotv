"use client";

import React, { Suspense, useEffect, useRef } from "react";
import SideNav from "./SideNav";
import { GetUser } from "@/utils/session";
import PageSkeleton from "./skeletons/page";

type AuthLayoutProps = {
  children: React.ReactNode;
  user: any;
};
export default function AuthLayout({ children, user }: AuthLayoutProps) {
  return (
    <>
      <main className="grow h-screen overflow-hidden">
        <SideNav user={user}>
          <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
        </SideNav>
      </main>
    </>
  );
}
