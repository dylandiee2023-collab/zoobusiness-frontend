import {
  useState,
  type JSX,
} from "react";

import {
  Calendar,
} from "../calendar";

import {
  datePickerRecipe,
} from "./DatePicker.recipe";

import type {
  DatePickerProps,
} from "./DatePicker.types";

export function DatePicker({
  value,
  placeholder = "Select date",
  disabled = false,
  onValueChange,
  className = "",
  ...props
}: DatePickerProps): JSX.Element {

  const styles =
    datePickerRecipe();

  const [open, setOpen] =
    useState(false);

  return (
    <div
      className={`${styles.root} ${className}`}
      {...props}
    >
      <input
        readOnly
        disabled={disabled}
        value={
          value
            ? value.toLocaleDateString()
            : ""
        }
        placeholder={placeholder}
        className={styles.input}
        onClick={() =>
          setOpen(
            (state) => !state,
          )
        }
      />

      <span className={styles.icon}>
        📅
      </span>

      {open && (
        <div className={styles.popup}>
          <Calendar
            value={value}
            onValueChange={(date) => {
              onValueChange?.(date);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}