"use client";

import { MenuItem } from "@headlessui/react";
import { memo } from "react";

import type { MenuBtnProps } from "@/types";

function MenuBtn({
  children,
  title,
  handleClick,
  className = "",
}: MenuBtnProps) {
  return (
    <MenuItem>
      <button
        type="button"
        title={title}
        aria-label={title}
        onClick={handleClick}
        className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 dark:data-focus:bg-wt-primary/10 data-focus:bg-bt-primary/5 cursor-pointer ${className}`}
      >
        {children}
      </button>
    </MenuItem>
  );
}

export default memo(MenuBtn);
