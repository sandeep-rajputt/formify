"use client";
import { memo } from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
  handleClick?: () => void;
};

function PrimarySquareButton({
  className = "",
  children,
  title = "",
  disabled = false,
  handleClick = () => {},
}: Props) {
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
