import type {
  HTMLAttributes,
} from "react";

export interface TimeValue {
  hour: number;

  minute: number;
}

export interface TimePickerProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange"
  > {
  value?: TimeValue | undefined;

  disabled?: boolean | undefined;

  placeholder?: string | undefined;

  format?: "12h" | "24h" | undefined;

  onValueChange?: (
    value: TimeValue,
  ) => void;
}