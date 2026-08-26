import type {
  HTMLAttributes,
} from "react";

export interface SliderProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange"
  > {
  value?: number | undefined;

  min?: number | undefined;

  max?: number | undefined;

  step?: number | undefined;

  disabled?: boolean | undefined;

  showValue?: boolean | undefined;

  onValueChange?: (
    value: number,
  ) => void;
}