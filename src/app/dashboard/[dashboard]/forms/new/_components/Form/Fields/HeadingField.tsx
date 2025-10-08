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

type HeadingFieldProps = {
  label: string;
  level: "h1" | "h2" | "h3";
  id: string;
  index: number;
  totalFields: number;
  setFieldSetting: () => void;
  formId: FormId;
};

export function HeadingField({
  label,
  level,
  id,
  index,
  totalFields,
  setFieldSetting,
  formId,
}: HeadingFieldProps) {
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
        {level === "h1" && (
          <h1 className="font-bold text-2xl">
            <EllipsisText>{label}</EllipsisText>
          </h1>
        )}
        {level === "h2" && (
          <h2 className="font-bold text-xl">
            <EllipsisText>{label}</EllipsisText>
          </h2>
        )}
        {level === "h3" && (
          <h3 className="font-bold text-lg">
            <EllipsisText>{label}</EllipsisText>
          </h3>
        )}
        <p className="text-xs opacity-50 mt-1">Level: {level.toUpperCase()}</p>
      </div>
      <p className="text-center opacity-50 text-xs truncate">id: {id}</p>
    </div>
  );
}
