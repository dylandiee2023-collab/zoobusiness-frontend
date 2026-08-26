import type {
  JSX,
} from "react";

import {
  stepperRecipe,
} from "./Stepper.recipe";

import type {
  StepperProps,
} from "./Stepper.types";

export function Stepper({
  steps,
  currentStep,
  className = "",
  ...props
}: StepperProps): JSX.Element {
  const styles =
    stepperRecipe();

  return (
    <div
      className={`${styles.root} ${className}`}
      {...props}
    >
      {steps.map(
        (
          step,
          index,
        ) => {
          const state =
            index < currentStep
              ? styles.completed
              : index ===
                  currentStep
                ? styles.active
                : styles.pending;

          return (
            <div
              key={step.id}
              className={styles.step}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`${styles.circle} ${state}`}
                >
                  {index + 1}
                </div>

                <span
                  className={styles.title}
                >
                  {step.title}
                </span>
              </div>

              {index <
                steps.length -
                  1 && (
                <div
                  className={
                    styles.line
                  }
                />
              )}
            </div>
          );
        },
      )}
    </div>
  );
}