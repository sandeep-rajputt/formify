"use client";
import { memo } from "react";
import type { PrimarySquareButtonProps } from "@/types";

function PrimarySquareButton({
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
      className={`bg-brand-primary flex items-center justify-center gap-3 text-white px-4 py-2 rounded-md font-semibold cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export default memo(PrimarySquareButton);
