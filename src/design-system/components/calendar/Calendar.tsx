import type {
  JSX,
} from "react";

import {
  calendarRecipe,
} from "./Calendar.recipe";

import type {
  CalendarProps,
} from "./Calendar.types";

const WEEK_DAYS = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
];

export function Calendar({
  value,
  onValueChange,
  className = "",
  ...props
}: CalendarProps): JSX.Element {

  const styles =
    calendarRecipe();

  const today =
    new Date();

  const year =
    value?.getFullYear() ??
    today.getFullYear();

  const month =
    value?.getMonth() ??
    today.getMonth();

  const days =
    new Date(
      year,
      month + 1,
      0,
    ).getDate();

  return (
    <div
      className={`${styles.root} ${className}`}
      {...props}
    >
      <div className={styles.header}>
        <span className={styles.title}>
          {today.toLocaleString(
            "default",
            {
              month: "long",
            },
          )}{" "}
          {year}
        </span>
      </div>

      <div className={styles.grid}>
        {WEEK_DAYS.map(
          (day) => (
            <div
              key={day}
              className={
                styles.weekday
              }
            >
              {day}
            </div>
          ),
        )}

        {Array.from(
          {
            length: days,
          },
          (_, index) => {
            const date =
              new Date(
                year,
                month,
                index + 1,
              );

            const selected =
              value?.toDateString() ===
              date.toDateString();

            return (
              <button
                key={index}
                type="button"
                className={[
                  styles.day,
                  selected
                    ? styles.selected
                    : "",
                ].join(" ")}
                onClick={() =>
                  onValueChange?.(
                    date,
                  )
                }
              >
                {index + 1}
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}