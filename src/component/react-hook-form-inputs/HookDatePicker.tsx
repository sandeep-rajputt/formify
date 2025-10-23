"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import DatePicker from "@/app/dashboard/[dashboard]/_components/common/DatePicker";

// Helper function to format date to local YYYY-MM-DD string without timezone issues
function formatDateToLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Helper function to parse YYYY-MM-DD string to local Date without timezone issues
function parseDateFromLocal(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in Date constructor
}

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
                  ? parseDateFromLocal(field.value)
                  : field.value &&
                    typeof field.value === "object" &&
                    "start" in field.value
                  ? {
                      start: field.value.start
                        ? parseDateFromLocal(field.value.start)
                        : null,
                      end: field.value.end
                        ? parseDateFromLocal(field.value.end)
                        : null,
                    }
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
                  // Handle range mode - convert dates to local date strings
                  field.onChange({
                    start: value.start
                      ? formatDateToLocal(value.start)
                      : undefined,
                    end: value.end ? formatDateToLocal(value.end) : undefined,
                  });
                } else if (value instanceof Date) {
                  // Handle single mode - convert date to local date string
                  field.onChange(formatDateToLocal(value));
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

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error === "Invalid input: expected string, received undefined"
            ? "Please select a date"
            : error}
        </p>
      )}
    </div>
  );
}

export default HookDatePicker;
