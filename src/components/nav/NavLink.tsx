"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkProps = {
  href: string;
  children?: React.ReactNode;
  exact?: boolean;
  activeClass?: string;
  disabled?: boolean;
  inactiveClass?: string;
  className?: string;
  render?: (active: boolean) => React.ReactNode;
};

export default function NavLink({
  href,
  children,
  exact,
  activeClass,
  inactiveClass,
  disabled,
  className,
  render,
}: NavLinkProps) {
  const router = usePathname();
  const current =
    href == "/"
      ? router === href
      : router
      ? exact
        ? router === href
        : router.startsWith(href)
      : false;
  return disabled ? (
    <div className={`${className} ${current ? activeClass : inactiveClass}`}>
      {render ? render(current) : null}
      {children}
    </div>
  ) : (
    <Link
      className={`${className} ${current ? activeClass : inactiveClass}`}
      href={href}
    >
      {render ? render(current) : null}
      {children}
    </Link>
  );
}
