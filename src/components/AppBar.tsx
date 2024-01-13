"use client";
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import ObservableBoundary from "@/utils/ObservableBoundary";
import { twMerge } from "tailwind-merge";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AppBar(props: any) {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams() as any;
  const [q, setQ] = useState(params.get("q") || "");
  const [navClass, setNavClass] = useState("");

  useEffect(() => {
    router.replace(`${path}/?q=${q}`);
  }, [params]);

  return (
    <>
      <ObservableBoundary
        className="h-4 w-full bg-transparent"
        onHidden={() => {
          setNavClass("sticky top-0 border-b shadow");
        }}
        onShown={() => {
          setNavClass("");
        }}
      />
      <div
        className={twMerge("bg-white transition-all py-3 px-6  z-10", navClass)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.replace(`${path}/?q=${q}`);
          }}
        >
          <input
            type="text"
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="border p-2 min-w-[40%] shadow rounded-lg"
          />
        </form>
      </div>
    </>
  );
}
