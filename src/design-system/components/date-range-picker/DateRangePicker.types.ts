import type { HTMLAttributes } from "react";

export interface DateRange {
  start?: Date | undefined;

  end?: Date | undefined;
}

export interface DateRangePickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: DateRange | undefined;

  placeholder?: string | undefined;

  disabled?: boolean | undefined;

  onValueChange?: (value: DateRange) => void;
}
