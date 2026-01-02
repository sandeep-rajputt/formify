"use client";
import { memo } from "react";
import type { PrimarySquareButtonProps } from "@/types";

function SecondarySquareButton({
  className = "",
  children,
  title = "",
  disabled = false,
  handleClick = () => {},
}: PrimarySquareButtonProps) {
  return (
    <button
      title={title || (children as string)}
      aria-label={title || (children as string)}
      onClick={handleClick}
      disabled={disabled}
      className={`border border-light-fg-muted/20 dark:border-dark-fg-muted/20 flex items-center justify-center gap-3 text-light-fg dark:text-dark-fg px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-light-surface dark:hover:bg-dark-surface transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default memo(SecondarySquareButton);
