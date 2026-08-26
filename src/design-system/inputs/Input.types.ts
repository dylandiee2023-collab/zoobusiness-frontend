import type {
  InputHTMLAttributes,
} from "react";

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size"
  > {
  fullWidth?: boolean;

  invalid?: boolean;
}