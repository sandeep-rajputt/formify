"use client";
import { MenuButton } from "@headlessui/react";
import { memo } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function MainButton({ children, className = "" }: Props) {
  return (
    <MenuButton
      className={`inline-flex items-center gap-2 rounded-md dark:bg-light-fg/10 bg-dark-fg/10 backdrop-blur-2xl border dark:border-dark-fg/10 border-light-fg/10 px-3 py-1.5 text-sm/6 font-semibold dark:shadow-lg focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-light-fg-muted/5 cursor-pointer data-open:bg-light-fg-muted/5 dark:data-hover:bg-dark-fg-muted/5 dark:data-open:bg-dark-fg-muted/5 ${className}`}
    >
      {children}
    </MenuButton>
  );
}

export default memo(MainButton);
