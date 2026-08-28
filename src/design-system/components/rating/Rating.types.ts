import type { HTMLAttributes } from "react";

export interface RatingProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: number | undefined;

  max?: number | undefined;

  readonly?: boolean | undefined;

  disabled?: boolean | undefined;

  allowHalf?: boolean | undefined;

  icon?: React.ReactNode | undefined;

  onValueChange?: (value: number) => void;
}
