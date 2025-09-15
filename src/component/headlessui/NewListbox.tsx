import React from "react";
import { Listbox } from "@headlessui/react";
type FilterOptions = {
  id: number;
  name: string;
};

function NewListbox({
  selected,
  handleChange,
  children,
}: {
  selected: FilterOptions;
  handleChange: (value: FilterOptions) => void;
  children: React.ReactNode;
}) {
  return (
    <Listbox value={selected} onChange={handleChange}>
      {children}
    </Listbox>
  );
}

export default NewListbox;
