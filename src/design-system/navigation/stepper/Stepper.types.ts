import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export interface StepperItem {
  id: string;

  label: ReactNode;

  description?: ReactNode;

  disabled?: boolean;
}

export interface StepperProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange"
  > {
  items: StepperItem[];

  activeStep: number;

  onChange?(step: number): void;
}