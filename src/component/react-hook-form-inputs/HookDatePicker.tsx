"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import DatePicker from "@/app/dashboard/[dashboard]/_components/common/DatePicker";

interface HookDatePickerProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  message?: string;
  mode?: "single" | "range";
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  weekStartsOn?: 0 | 1;
}

function HookDatePicker<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  error,
  required = false,
  placeholder,
  message,
  mode = "single",
  minDate,
  maxDate,
  isDateDisabled,
  weekStartsOn = 0,
}: HookDatePickerProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div>
          <label className="text-[13px] font-medium wrap-anywhere">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {message && (
            <p className="text-xs opacity-80 dark:text-dark-fg-muted">
              {message}
            </p>
          )}
        </div>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            value={
              field.value && field.value !== undefined
                ? typeof field.value === "string"
                  ? new Date(field.value)
                  : field.value
                : undefined
            }
            onChange={(value) => {
              if (value) {
                if (
                  mode === "range" &&
                  typeof value === "object" &&
                  "start" in value
                ) {
                  // Handle range mode - convert dates to ISO strings
                  field.onChange({
                    start: value.start
                      ? value.start.toISOString().split("T")[0]
                      : undefined,
                    end: value.end
                      ? value.end.toISOString().split("T")[0]
                      : undefined,
                  });
                } else if (value instanceof Date) {
                  // Handle single mode - convert date to ISO string
                  field.onChange(value.toISOString().split("T")[0]);
                }
              } else {
                field.onChange(undefined);
              }
            }}
            placeholder={placeholder}
            mode={mode}
            minDate={minDate}
            maxDate={maxDate}
            isDateDisabled={isDateDisabled}
            weekStartsOn={weekStartsOn}
          />
        )}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default HookDatePicker;
