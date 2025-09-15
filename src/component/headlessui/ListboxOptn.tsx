import React from "react";
import { ListboxOption } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";

type Data = {
  id: number;
  name: string;
};

function ListboxOptn({
  data,
  className,
  selected,
  size = 16,
  children,
}: {
  data: Data;
  className?: string;
  selected: Data;
  size?: number;
  children?: React.ReactNode;
}) {
  return (
    <ListboxOption
      key={data.id}
      value={data}
      className={`group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 text-sm select-none dark:data-[focus]:bg-white/10 data-[focus]:bg-dark-bg/5 ${className}`}
    >
      <FaCheck
        className={`opacity-70 ${
          selected.id === data.id ? "visible" : "invisible"
        }`}
        size={size}
      />
      {children ? (
        <div>{children}</div>
      ) : (
        <div>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</div>
      )}
    </ListboxOption>
  );
}

export default ListboxOptn;
