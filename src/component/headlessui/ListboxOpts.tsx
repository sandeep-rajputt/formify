import React from "react";
import { ListboxOptions } from "@headlessui/react";

function ListboxOpts({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ListboxOptions
      anchor="bottom"
      transition
      className={`w-[var(--button-width)] scrollbar backdrop-blur-md rounded-xl border border-light-fg/10 dark:border-dark-fg/10 bg-light-bg dark:bg-dark-bg p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 ${className}`}
    >
      {children}
    </ListboxOptions>
  );
}

export default ListboxOpts;
