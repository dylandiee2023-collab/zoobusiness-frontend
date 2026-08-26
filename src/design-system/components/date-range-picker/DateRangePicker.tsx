import {
  useState,
  type JSX,
} from "react";

import {
  Calendar,
} from "../calendar";

import {
  dateRangePickerRecipe,
} from "./DateRangePicker.recipe";

import type {
  DateRange,
  DateRangePickerProps,
} from "./DateRangePicker.types";

export function DateRangePicker({
  value,
  placeholder = "Select date range",
  disabled = false,
  onValueChange,
  className = "",
  ...props
}: DateRangePickerProps): JSX.Element {

  const styles =
    dateRangePickerRecipe();

  const [open, setOpen] =
    useState(false);

  const handleStartChange = (
    date: Date,
  ) => {
    const next: DateRange = {
      start: date,
      end: value?.end,
    };

    onValueChange?.(next);
  };

  const handleEndChange = (
    date: Date,
  ) => {
    const next: DateRange = {
      start: value?.start,
      end: date,
    };

    onValueChange?.(next);

    setOpen(false);
  };

  const displayValue =
    value?.start && value?.end
      ? `${value.start.toLocaleDateString()} - ${value.end.toLocaleDateString()}`
      : "";

  return (
    <div
      className={`${styles.root} ${className}`}
      {...props}
    >
      <input
        readOnly
        disabled={disabled}
        placeholder={placeholder}
        value={displayValue}
        className={styles.input}
        onClick={() =>
          setOpen(
            (state) => !state,
          )
        }
      />

      {open && (
        <div className={styles.popup}>
          <div className={styles.calendar}>
            <Calendar
              value={value?.start}
              onValueChange={
                handleStartChange
              }
            />

            <div
              className={
                styles.divider
              }
            />

            <Calendar
              value={value?.end}
              onValueChange={
                handleEndChange
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}