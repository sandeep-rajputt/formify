"use client";
import DropDown from "@/component/headlessui/DropDown";
import MenuBtn from "@/component/headlessui/MenuBtn";
import { FormId } from "@/types/form-types";
import { FormFieldOptions } from "@/types/form-types";
import { MenuButton } from "@headlessui/react";
import React from "react";
import { useAppDispatch } from "@/hooks/reduxToolkit";
import { addField } from "@/Store/slice/formSlice";
import addPropertyInField from "@/utils/addPropertyInField";

const options: FormFieldOptions[] = [
  { name: "Text Input", value: "text-input", type: "input" },
  { name: "Long Text", value: "long-text", type: "input" },
  { name: "Number", value: "number", type: "input" },
  { name: "Email", value: "email", type: "input" },
  { name: "Date", value: "date", type: "input" },
  { name: "Checkbox", value: "checkbox", type: "input" },
  { name: "Select", value: "select", type: "input" },
  { name: "Heading", value: "heading", type: "style" },
  { name: "Paragraph", value: "paragraph", type: "style" },
  { name: "Divider", value: "divider", type: "style" },
  { name: "List", value: "list", type: "input" },
];

function AddFormField({
  disableScroll,
  enableScroll,
  fieldIndex,
  formId,
}: {
  disableScroll: () => void;
  enableScroll: () => void;
  fieldIndex: number;
  formId: FormId;
}) {
  const dispatch = useAppDispatch();

  function handleBtnClick(item: FormFieldOptions) {
    const data = addPropertyInField(item);
    if (data) {
      dispatch(addField({ data: data, index: fieldIndex, formId }));
    }
  }
  return (
    <div className="flex items-center justify-center py-3">
      <DropDown
        mainButton={<AddFieldButton />}
        anchor="bottom"
        width="w-48"
        className="!bg-light-surface-alt scrollbar dark:!bg-dark-surface"
        onOpenChange={(open) => {
          if (open) {
            disableScroll();
          } else {
            enableScroll();
          }
        }}
      >
        {options.map((item, index) => {
          if (index === 0)
            return (
              <React.Fragment key={item.value}>
                <div className="text-center py-1 text-light-fg-muted dark:text-dark-fg-muted">
                  Input Fields 👇
                </div>
                <MenuBtn
                  className="text-xs"
                  title={`Add ${item.name}`}
                  handleClick={() => {
                    handleBtnClick(item);
                  }}
                >
                  {item.name}
                </MenuBtn>
              </React.Fragment>
            );
          else if (item.value === "heading") {
            return (
              <React.Fragment key={item.value}>
                <div className="text-center py-1 text-light-fg-muted dark:text-dark-fg-muted">
                  Style Fields 👇
                </div>
                <MenuBtn
                  className="text-xs"
                  title={`Add ${item.name}`}
                  handleClick={() => {
                    handleBtnClick(item);
                  }}
                >
                  {item.name}
                </MenuBtn>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={item.value}>
                <MenuBtn
                  className="text-xs"
                  title={`Add ${item.name}`}
                  handleClick={() => {
                    handleBtnClick(item);
                  }}
                >
                  {item.name}
                </MenuBtn>
              </React.Fragment>
            );
          }
        })}
      </DropDown>
    </div>
  );
}

export default AddFormField;

function AddFieldButton() {
  return (
    <div className="rounded-lg w-fit border dark:border-dark-fg/5 border-light-fg/10 bg-light-surface-alt dark:bg-dark-surface text-sm focus:outline-none data-[focus]:outline-2 data-[focus]:outline-light-bg overflow-hidden">
      <MenuButton
        className={
          "flex items-center justify-between py-2 px-3 w-full cursor-pointer"
        }
      >
        Add Field
      </MenuButton>
    </div>
  );
}
