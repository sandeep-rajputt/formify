"use client";

import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { SlCalender } from "react-icons/sl";
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";

type Range = { start: Date | null; end: Date | null };

export type DatePickerProps = {
  mode?: "single" | "range";
  value?: Date | Range | null;
  onChange?: (value: Date | Range | null) => void;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (d: Date) => boolean;
  initialMonth?: Date;
  placeholder?: string;
  weekStartsOn?: 0 | 1;
};

export default function DatePicker({
  mode = "single",
  value = null,
  onChange,
  minDate,
  maxDate,
  isDateDisabled,
  initialMonth,
  placeholder = "Select a date",
  weekStartsOn = 0,
}: DatePickerProps) {
  const [selected, setSelected] = useState<Date | null>(() =>
    value && !(value as Range).start ? (value as Date) : null
  );
  const [range, setRange] = useState<Range>(() =>
    value && (value as Range).start
      ? (value as Range)
      : { start: null, end: null }
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(
    initialMonth ? startOfMonth(initialMonth) : startOfMonth(new Date())
  );
  const [focusedDate, setFocusedDate] = useState<Date>(new Date());

  // refs for focusing calendar cells
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  // track whether popover was open for focus logic (not controlling Headless UI)
  const panelOpenRef = useRef(false);

  // sync controlled value -> internal state
  useEffect(() => {
    if (!value) {
      setSelected(null);
      setRange({ start: null, end: null });
    } else if ((value as Range).start !== undefined) {
      setRange(value as Range);
      setSelected(null);
    } else {
      setSelected(value as Date);
      setRange({ start: null, end: null });
    }
  }, [value]);

  function startOfDay(d: Date) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }
  function endOfDay(d: Date) {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  }

  const disabledCheck = (d: Date) => {
    if (minDate && isBefore(d, startOfDay(minDate))) return true;
    if (maxDate && isAfter(d, endOfDay(maxDate))) return true;
    if (isDateDisabled && isDateDisabled(d)) return true;
    return false;
  };

  // build calendar weeks (each week is 7 days)
  const weeks = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn });
    const totalDays = differenceInCalendarDays(end, start) + 1;
    const days: Date[] = [];
    for (let i = 0; i < totalDays; i++) days.push(addDays(start, i));
    const w: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) w.push(days.slice(i, i + 7));
    return w;
  }, [currentMonth, weekStartsOn]);

  const inCurrentMonth = (d: Date) => d.getMonth() === currentMonth.getMonth();

  const isDaySelected = (d: Date) => {
    if (mode === "single") return selected && isSameDay(d, selected);
    if (mode === "range" && range.start && range.end)
      return isWithinInterval(d, { start: range.start, end: range.end });
    if (mode === "range" && range.start) return isSameDay(d, range.start);
    return false;
  };

  const isRangeStart = (d: Date) =>
    mode === "range" && range.start && isSameDay(d, range.start);
  const isRangeEnd = (d: Date) =>
    mode === "range" && range.end && isSameDay(d, range.end);

  const commitSingle = (d: Date) => {
    if (disabledCheck(d)) return;
    setSelected(d);
    onChange?.(d);
  };
  const commitRange = (d: Date) => {
    if (disabledCheck(d)) return;
    if (!range.start || (range.start && range.end)) {
      setRange({ start: d, end: null });
      onChange?.({ start: d, end: null });
    } else if (range.start && !range.end) {
      if (d < range.start) {
        setRange({ start: d, end: range.start });
        onChange?.({ start: d, end: range.start });
      } else {
        setRange({ start: range.start, end: d });
        onChange?.({ start: range.start, end: d });
      }
    }
  };

  function selectDay(d: Date) {
    if (mode === "single") commitSingle(d);
    else commitRange(d);
    setFocusedDate(d);
  }

  // focus the currently focusedDate button when popover is open
  useEffect(() => {
    if (!panelOpenRef.current || !focusedDate) return;
    const key = focusedDate.toISOString();
    const btn = refs.current[key];
    if (btn) btn.focus();
  }, [focusedDate]);

  // called when popover opens (we don't control open state here)
  const onOpen = () => {
    panelOpenRef.current = true;
    const init =
      mode === "single"
        ? selected ?? new Date()
        : range.start ?? range.end ?? new Date();
    setFocusedDate(init);
    setCurrentMonth(startOfMonth(init));
  };

  // called when popover closes (cleanup)
  const onCloseLocal = () => {
    panelOpenRef.current = false;
  };

  // keyboard handler uses optional close() from Headless UI render props
  const handleKeyDown = (e: React.KeyboardEvent, close?: () => void) => {
    if (!focusedDate) return;
    let prevented = false;
    let newDate = focusedDate;

    switch (e.key) {
      case "ArrowLeft":
        newDate = addDays(focusedDate, -1);
        prevented = true;
        break;
      case "ArrowRight":
        newDate = addDays(focusedDate, 1);
        prevented = true;
        break;
      case "ArrowUp":
        newDate = addDays(focusedDate, -7);
        prevented = true;
        break;
      case "ArrowDown":
        newDate = addDays(focusedDate, 7);
        prevented = true;
        break;
      case "PageUp":
        newDate = subMonths(focusedDate, 1);
        prevented = true;
        break;
      case "PageDown":
        newDate = addMonths(focusedDate, 1);
        prevented = true;
        break;
      case "Home":
        newDate = startOfMonth(focusedDate);
        prevented = true;
        break;
      case "End":
        newDate = endOfMonth(focusedDate);
        prevented = true;
        break;
      case "Enter":
      case " ":
        selectDay(focusedDate);
        prevented = true;
        break;
      case "Escape":
        prevented = true;
        // close popup if close provided
        close?.();
        break;
    }

    if (prevented) {
      e.preventDefault();
      setFocusedDate(newDate);
      if (newDate.getMonth() !== currentMonth.getMonth())
        setCurrentMonth(startOfMonth(newDate));
    }
  };

  const formatLabelSingle = () =>
    selected ? (
      format(selected, "yyyy-MM-dd")
    ) : (
      <div className="flex items-center gap-3">
        {placeholder} <SlCalender />
      </div>
    );
  const formatLabelRange = () =>
    range.start && range.end ? (
      `${format(range.start, "yyyy-MM-dd")} → ${format(
        range.end,
        "yyyy-MM-dd"
      )}`
    ) : range.start ? (
      `${format(range.start, "yyyy-MM-dd")} → ?`
    ) : (
      <div className="flex items-center gap-3">
        {placeholder} <SlCalender />
      </div>
    );

  return (
    <Popover className="relative inline-block">
      {({ open, close }) => (
        <>
          {/* when open state changes, keep our local ref in sync for focus management */}
          {open && !panelOpenRef.current && onOpen()}
          {!open && panelOpenRef.current && onCloseLocal()}

          <div
            className="overflow-hidden w-fit rounded shadow border border-light-fg-muted/10 dark:border-dark-fg-muted/10 flex justify-between items-center bg-light-surface dark:bg-dark-surface
                text-light-fg dark:text-dark-fg "
          >
            <Popover.Button
              className="w-fit text-left px-3 py-2"
              onClick={() => !open && onOpen()}
            >
              <span className="truncate">
                {mode === "single" ? formatLabelSingle() : formatLabelRange()}
              </span>
            </Popover.Button>
            {((mode === "single" && selected) ||
              (mode === "range" && (range.start || range.end))) && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (mode === "single") {
                    setSelected(null);
                    onChange?.(null);
                  } else {
                    setRange({ start: null, end: null });
                    onChange?.({ start: null, end: null });
                  }
                }}
                className="
                  hover:text-red-500 pr-3 cursor-pointer dark:hover:text-red-400"
                aria-label="Clear date"
                title="Clear date"
              >
                ×
              </button>
            )}
          </div>

          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            afterLeave={onCloseLocal}
          >
            <Popover.Panel
              className="absolute z-100000 mt-2 w-80 rounded p-3 shadow-lg border border-light-fg-muted/10 dark:border-dark-fg-muted/10
                bg-light-surface dark:bg-dark-surface
                text-light-fg dark:text-dark-fg flex flex-col
                left-0 origin-top-left"
              onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent, close)}
              role="dialog"
              aria-modal="false"
            >
              {/* Month header */}
              <div className="flex px-1 justify-between items-center mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentMonth(subMonths(currentMonth, 1));
                    // move focused date to start of that month for keyboard navigation
                    setFocusedDate(startOfMonth(subMonths(currentMonth, 1)));
                  }}
                  className="px-2 py-1 rounded hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt"
                  aria-label="Previous month"
                >
                  {"<"}
                </button>

                <span className="font-medium" aria-live="polite">
                  {format(currentMonth, "MMMM yyyy")}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentMonth(addMonths(currentMonth, 1));
                    setFocusedDate(startOfMonth(addMonths(currentMonth, 1)));
                  }}
                  className="px-2 py-1 rounded hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt"
                  aria-label="Next month"
                >
                  {">"}
                </button>
              </div>

              {/* Weekday labels */}
              <div className="px-1 mb-2 grid grid-cols-7 gap-1 text-center font-medium text-light-fg-muted dark:text-dark-fg-muted">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {weeks.flat().map((day) => {
                  const key = day.toISOString();
                  const isDisabled = disabledCheck(day);
                  const selectedDay = isDaySelected(day);
                  const isStart = isRangeStart(day);
                  const isEnd = isRangeEnd(day);
                  const isFocused = focusedDate && isSameDay(day, focusedDate);

                  return (
                    <button
                      key={key}
                      ref={(el) => {
                        refs.current[key] = el;
                      }}
                      type="button"
                      role="gridcell"
                      aria-selected={selectedDay ? "true" : "false"}
                      aria-disabled={isDisabled ? "true" : "false"}
                      tabIndex={isFocused ? 0 : -1}
                      onClick={() => !isDisabled && selectDay(day)}
                      onFocus={() => setFocusedDate(day)}
                      className={`p-1.5 w-full rounded text-center
                        ${!inCurrentMonth(day) ? "opacity-50" : ""}
                        ${
                          selectedDay
                            ? "bg-brand-primary text-white"
                            : "hover:bg-light-surface-alt dark:hover:bg-dark-surface-alt"
                        }
                        ${isStart && isEnd ? "rounded-full" : ""}
                        ${isStart && !isEnd ? "rounded-l-full" : ""}
                        ${isEnd && !isStart ? "rounded-r-full" : ""}
                        ${
                          isDisabled
                            ? "cursor-not-allowed opacity-40"
                            : "cursor-pointer"
                        }
                        `}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* OK Button */}
              <button
                type="button"
                disabled={
                  mode === "single" ? !selected : !(range.start && range.end)
                }
                onClick={() => {
                  // Commit selection
                  if (mode === "single" && selected) onChange?.(selected);
                  if (mode === "range" && range.start && range.end)
                    onChange?.(range);
                  // Close the popover using Headless UI close()
                  close();
                }}
                className={`mt-2 w-full py-2 rounded font-medium
                  ${
                    (mode === "single" ? selected : range.start && range.end)
                      ? "bg-brand-primary text-white hover:bg-blue-600 dark:hover:bg-blue-500"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  }`}
              >
                OK
              </button>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
