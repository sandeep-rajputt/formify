import React from "react";
import { ListboxButton } from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa6";

function ListBoxBtn({
  className,
  size = 16,
  children,
}: {
  className?: string;
  size?: number;
  children: React.ReactNode;
}) {
  return (
    <ListboxButton
      className={`relative flex items-center justify-between rounded-lg bg-light-surface-alt dark:bg-dark-surface-alt py-2 px-3 text-sm focus:outline-none data-[focus]:outline-2 data-[focus]:outline-light-bg ${className}`}
    >
      <span>{children}</span>
      <FaAngleDown aria-hidden="true" size={size} />
    </ListboxButton>
  );
}

export default ListBoxBtn;
