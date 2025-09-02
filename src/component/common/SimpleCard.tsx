"use client";
import { memo } from "react";

function SimpleCard({
  children,
  className = "",
  handleClick = () => {},
}: {
  children: React.ReactNode;
  className?: string;
  handleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div
      onClick={(e) => handleClick(e)}
      className={`rounded-xl border dark:border-dark-fg/5 border-light-fg/10 dark:bg-dark-fg/5 bg-dark-fg/20 dark:text-dark-fg text-light-fg p-4 backdrop-blur-2xl ${className}`}
    >
      {children}
    </div>
  );
}

export default memo(SimpleCard);
