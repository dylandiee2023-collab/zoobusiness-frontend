import {
  useState,
  type JSX,
} from "react";

import {
  timePickerRecipe,
} from "./TimePicker.recipe";

import type {
  TimePickerProps,
} from "./TimePicker.types";

export function TimePicker({
  value,
  disabled = false,
  placeholder = "Select time",
  onValueChange,
  className = "",
  ...props
}: TimePickerProps): JSX.Element {

  const styles =
    timePickerRecipe();

  const [open, setOpen] =
    useState(false);

  const hour =
    value?.hour ?? 0;

  const minute =
    value?.minute ?? 0;

  const display =
    `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;

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
            ? display
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

      {open && (
        <div className={styles.popup}>
          <select
            className={styles.select}
            value={hour}
            onChange={(event) =>
              onValueChange?.({
                hour: Number(
                  event.target.value,
                ),
                minute,
              })
            }
          >
            {Array.from(
              {
                length: 24,
              },
              (_, index) => (
                <option
                  key={index}
                  value={index}
                >
                  {index
                    .toString()
                    .padStart(2, "0")}
                </option>
              ),
            )}
          </select>

          <select
            className={styles.select}
            value={minute}
            onChange={(event) =>
              onValueChange?.({
                hour,
                minute: Number(
                  event.target.value,
                ),
              })
            }
          >
            {Array.from(
              {
                length: 60,
              },
              (_, index) => (
                <option
                  key={index}
                  value={index}
                >
                  {index
                    .toString()
                    .padStart(2, "0")}
                </option>
              ),
            )}
          </select>
        </div>
      )}
    </div>
  );
}