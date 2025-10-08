"use client";

import { IoMdArrowUp } from "react-icons/io";
import { IoMdArrowDown } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/reduxToolkit";
import { pushDown, pullUp, deleteField } from "@/Store/slice/formSlice";
import HookSelectInput from "@/component/react-hook-form-inputs/HookSelectInput";
import { useForm } from "react-hook-form";
import { FormId } from "@/types/form-types";

type SelectFieldProps = {
  label: string;
  description?: string;
  id: string;
  required: boolean;
  options: Array<{ label: string; id: string }>;
  index: number;
  totalFields: number;
  setFieldSetting: () => void;
  formId: FormId;
};

export function SelectField({
  label,
  id,
  description,
  required,
  options,
  index,
  totalFields,
  formId,
  setFieldSetting,
}: SelectFieldProps) {
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const { control } = useForm({
    defaultValues: {
      selectValue: "",
    },
  });

  // Convert options to the format expected by HookSelectInput
  const selectOptions = options.map((option, index) => ({
    id: index + 1,
    name: option.label,
    value: option.id,
  }));

  return (
    <div
      className="relative border-2 border-light-fg-muted/10 dark:border-dark-fg-muted/10 rounded-lg p-2 flex flex-col gap-2"
      tabIndex={0}
      onFocus={() => {
        setShowOptions(true);
      }}
      onBlur={() => {
        setTimeout(() => {
          setShowOptions(false);
        }, 500);
      }}
    >
      {showOptions && (
        <div className="absolute py-1 px-2 right-2 -top-4 flex gap-2 bg-light-surface-alt dark:bg-dark-surface-alt rounded border border-light-fg-muted/30 dark:border-dark-fg-muted/30">
          {index !== 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(pullUp({ id, index, formId }));
              }}
              className="p-1 cursor-pointer rounded-md hover:bg-light-fg-muted/10 dark:hover:bg-dark-fg-muted/10"
            >
              <IoMdArrowUp className="w-4 h-4" />
            </button>
          )}

          {index !== totalFields - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(pushDown({ id, index, formId }));
              }}
              className="p-1 cursor-pointer rounded-md hover:bg-light-fg-muted/10 dark:hover:bg-dark-fg-muted/10"
            >
              <IoMdArrowDown className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setFieldSetting()}
            className="p-1 cursor-pointer rounded-md hover:bg-light-fg-muted/10 dark:hover:bg-dark-fg-muted/10"
          >
            <HiOutlinePencilSquare className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteField({ id, formId }));
            }}
            className="p-1 cursor-pointer rounded-md hover:bg-red-500/10 text-red-500"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="py-2">
        <HookSelectInput
          name="selectValue"
          control={control}
          label={label}
          message={description}
          required={required}
          placeholder="Select an option"
          options={selectOptions}
        />
        <p className="text-center pt-3 opacity-50 text-xs truncate">id: {id}</p>
      </div>
    </div>
  );
}
