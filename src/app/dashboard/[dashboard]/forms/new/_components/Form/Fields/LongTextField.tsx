"use client";

import EllipsisText from "@/component/common/EllipsisText";
import { IoMdArrowUp } from "react-icons/io";
import { IoMdArrowDown } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/reduxToolkit";
import { pushDown, pullUp, deleteField } from "@/Store/slice/formSlice";
import { FormId } from "@/types/form-types";

type LongTextFieldProps = {
  label: string;
  placeholder: string;
  description?: string;
  id: string;
  required: boolean;
  index: number;
  totalFields: number;
  setFieldSetting: () => void;
  formId: FormId;
};

export function LongTextField({
  label,
  placeholder,
  id,
  description,
  required,
  index,
  totalFields,
  setFieldSetting,
  formId,
}: LongTextFieldProps) {
  const dispatch = useAppDispatch();
  const [showOptions, setShowOptions] = useState<boolean>(false);

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
                console.log("push down clicked");
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

      <div className="px-1">
        <div className="flex pt-2">
          <EllipsisText>{label}</EllipsisText>
          {required && (
            <span className="inline-block pl-1 text-red-500">*</span>
          )}
        </div>
        {description && (
          <p className="text-light-fg-muted dark:text-dark-fg-muted text-sm/tight">
            {description}
          </p>
        )}
      </div>
      <div className="rounded-md border-2 px-3 py-3 border-light-fg-muted/5 dark:border-dark-fg-muted/5 min-h-[80px]">
        <p className="opacity-50">{placeholder}</p>
      </div>
      <p className="text-center opacity-50 text-xs truncate">id: {id}</p>
    </div>
  );
}
