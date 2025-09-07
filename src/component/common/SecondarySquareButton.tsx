"use client";
import { memo } from "react";
import type { SecondarySquareButtonProps } from "@/types";

function SecondarySquareButton({
  className = "",
  children,
  title = "",
  disabled = false,
  handleClick = () => {},
}: SecondarySquareButtonProps) {
  return (
    <button
      disabled={disabled}
      title={title || (children as string)}
      aria-label={title || (children as string)}
      onClick={handleClick}
      className={`rounded-md flex items-center justify-center gap-3 px-4 py-2 font-semibold border dark:border-dark-fg/5 border-light-fg/10 dark:bg-dark-fg/5 bg-dark-fg/10 dark:text-dark-fg text-light-fg backdrop-blur-2xl cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export default memo(SecondarySquareButton);
