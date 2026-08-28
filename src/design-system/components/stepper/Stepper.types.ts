import type { HTMLAttributes, ReactNode } from "react";

export interface StepperItem {
  id: string;

  title: ReactNode;

  description?: ReactNode;
}

export interface StepperProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  steps: StepperItem[];

  currentStep: number;
}
