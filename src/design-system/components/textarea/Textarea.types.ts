import type {
  TextareaHTMLAttributes,
} from "react";

export interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "rows"
  > {
  size?: "sm" | "md" | "lg";

  error?: boolean;

  rows?: number;
}