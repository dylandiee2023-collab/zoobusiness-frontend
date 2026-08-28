import type { HTMLAttributes } from "react";

export interface CalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: Date | undefined;

  month?: number | undefined;

  year?: number | undefined;

  minDate?: Date | undefined;

  maxDate?: Date | undefined;

  onValueChange?: (date: Date) => void;
}
