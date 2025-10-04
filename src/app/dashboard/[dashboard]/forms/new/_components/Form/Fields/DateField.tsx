"use client";

import EllipsisText from "@/component/common/EllipsisText";
import { IoMdArrowUp } from "react-icons/io";
import { IoMdArrowDown } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/reduxToolkit";
import { pushDown, pullUp, deleteField } from "@/Store/slice/formSlice";
import DatePicker from "@/app/dashboard/[dashboard]/_components/common/DatePicker";

type DateFieldProps = {
  label: string;
  placeholder: string;
  description?: string;
  id: string;
  required: boolean;
  index: number;
  totalFields: number;
  setFieldSetting: () => void;
  mode?: "single" | "range";
  minDate?: string;
  maxDate?: string;
  weekStartsOn?: "0" | "1";
};

export function DateField({
  label,
  placeholder,
  id,
  description,
  required,
  index,
  totalFields,
  setFieldSetting,
  mode = "single",
  minDate,
  maxDate,
  weekStartsOn = "0",
}: DateFieldProps) {
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
                dispatch(pullUp({ id, index }));
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
                dispatch(pushDown({ id, index }));
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
              dispatch(deleteField(id));
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

      <div className="px-2">
        <DatePicker
          placeholder={placeholder}
          mode={mode}
          minDate={minDate && minDate !== null ? new Date(minDate) : undefined}
          maxDate={maxDate && maxDate !== null ? new Date(maxDate) : undefined}
          weekStartsOn={weekStartsOn === "0" ? 0 : 1}
        />
        {((minDate && minDate !== null) || (maxDate && maxDate !== null)) && (
          <p className="text-xs text-light-fg-muted dark:text-dark-fg-muted mt-1">
            {minDate && minDate !== null && maxDate && maxDate !== null
              ? `Range: ${new Date(minDate).toLocaleDateString()} - ${new Date(
                  maxDate
                ).toLocaleDateString()}`
              : minDate && minDate !== null
              ? `From: ${new Date(minDate).toLocaleDateString()}`
              : maxDate && maxDate !== null
              ? `Until: ${new Date(maxDate).toLocaleDateString()}`
              : ""}
          </p>
        )}
      </div>
      <p className="text-center opacity-50 text-xs truncate">id: {id}</p>
    </div>
  );
}
