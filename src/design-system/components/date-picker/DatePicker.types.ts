import type {
  HTMLAttributes,
} from "react";

export interface DatePickerProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange"
  > {
  value?: Date;

  placeholder?: string;

  disabled?: boolean;

  minDate?: Date;

  maxDate?: Date;

  onValueChange?: (
    date: Date,
  ) => void;
}