"use client";
import { Menu, MenuItems } from "@headlessui/react";
import { memo } from "react";

type AnchorProps =
  | "bottom end"
  | "bottom start"
  | "top end"
  | "top start"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top start"
  | "top end"
  | "bottom start"
  | "bottom end"
  | "left start"
  | "left end"
  | "right start"
  | "right end"
  | undefined;

type Props = {
  children: React.ReactNode;
  width?: string;
  anchor?: AnchorProps;
  mainButton: React.ReactNode;
  className?: string;
};

function DropDown({
  children,
  width = "w-52",
  anchor = "bottom end",
  mainButton,
  className = "",
}: Props) {
  return (
    <div>
      <Menu>
        {mainButton}
        <MenuItems
          transition
          anchor={anchor}
          className={`origin-top-right rounded-xl border dark:border-dark-fg/5 border-light-fg/10 dark:bg-light-fg/5 bg-dark-fg/5  p-1 text-sm/6 dark:text-dark-fg transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-110000 backdrop-blur-2xl ${width} ${className}`}
        >
          {children}
        </MenuItems>
      </Menu>
    </div>
  );
}

export default memo(DropDown);
