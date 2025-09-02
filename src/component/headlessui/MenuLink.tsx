"use client";
import { MenuItem } from "@headlessui/react";
import Link from "next/link";
import { memo } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  link: string;
  external?: boolean;
};

function MenuLink({
  children,
  className,
  link,
  title = "",
  external = false,
}: Props) {
  return (
    <MenuItem>
      <Link
        href={external ? link : `/${link}`}
        title={title || (children as string)}
        aria-label={title || (children as string)}
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : ""}
        aria-current="page"
        className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 dark:data-focus:bg-dark-fg/10 data-focus:bg-light-fg/5 cursor-pointer ${className}`}
      >
        {children}
      </Link>
    </MenuItem>
  );
}

export default memo(MenuLink);
