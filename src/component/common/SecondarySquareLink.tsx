"use client";
import { memo } from "react";
import type { PrimaryLinkProps } from "@/types";
import Link from "next/link";

function SecondarySquareLink({
  children,
  className,
  link,
  external = false,
  title,
}: PrimaryLinkProps) {
  return (
    <Link
      href={external ? link : link.startsWith("/") ? link : `/${link}`}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer nofollow" : undefined}
      title={title ? title : children?.toString()}
      aria-label={title ? title : children?.toString()}
      className={`rounded-md flex items-center justify-center gap-3 px-4 py-2 font-semibold border dark:border-dark-fg/5 border-light-fg/10 dark:bg-dark-fg/5 bg-dark-fg/10 dark:text-dark-fg text-light-fg backdrop-blur-2xl cursor-pointer ${className}`}
    >
      {children}
    </Link>
  );
}

export default memo(SecondarySquareLink);
