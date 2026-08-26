import type {
  HTMLAttributes,
} from "react";

export interface OtpInputProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange"
  > {
  length?: number | undefined;

  value?: string | undefined;

  disabled?: boolean | undefined;

  autoFocus?: boolean | undefined;

  mask?: boolean | undefined;

  onValueChange?: (
    value: string,
  ) => void;
}