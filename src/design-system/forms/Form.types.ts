import type { ReactNode } from "react";

export interface FormFieldContextValue {
  id: string;
  name?: string | undefined;
  label?: string | undefined;
  helperText?: string | undefined;
  error?: string | undefined;

  required: boolean;
  disabled: boolean;
  readOnly: boolean;

  invalid: boolean;

  state: "default" | "error";
}

export interface FormInstance {
  id: string;
  fields: FormFieldProps[];
}

export interface FormFieldProps {
  id?: string;
  name?: string;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  children: ReactNode;
}

export interface FormManager {
  enable(): void;
  disable(): void;
  destroy(): void;
  isEnabled(): boolean;
}
