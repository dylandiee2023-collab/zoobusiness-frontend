import { forwardRef, type KeyboardEvent } from "react";

import { useTheme } from "@/theme/hooks";

import { stepperRecipe } from "./Stepper.recipe";

import type { StepperItem, StepperProps } from "./Stepper.types";

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  function Stepper(
    { items, activeStep, onChange, className, style, ...props },
    ref,
  ) {
    const { theme } = useTheme();

    const recipe = stepperRecipe(theme, {
      items,
      activeStep,

      ...props,

      ...(onChange !== undefined && {
        onChange,
      }),
    });

    const changeStep = (index: number) => {
      const item = items[index];

      if (item && !item.disabled && onChange) {
        onChange(index);
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent<HTMLButtonElement>,
      index: number,
    ) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        changeStep(index);
      }
    };

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...recipe.style,
          ...style,
        }}
        role="list"
        {...props}
      >
        {items.map((item: StepperItem, index) => {
          const active = index === activeStep;

          const completed = index < activeStep;

          return (
            <div
              key={item.id}
              role="listitem"
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
              }}
            >
              <button
                type="button"
                disabled={item.disabled}
                aria-current={active ? "step" : undefined}
                aria-disabled={item.disabled || undefined}
                aria-label={`Go to step ${index + 1}: ${item.label}`}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onClick={() => changeStep(index)}
                style={{
                  display: "flex",

                  flexDirection: "column",

                  alignItems: "center",

                  gap: "8px",

                  background: "transparent",

                  border: "none",

                  outline: "none",

                  cursor: item.disabled ? "not-allowed" : "pointer",

                  opacity: item.disabled ? 0.5 : 1,

                  padding: 0,
                }}
              >
                <div
                  style={{
                    width: 36,

                    height: 36,

                    borderRadius: "50%",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    border: `2px solid ${
                      active || completed
                        ? theme.colors.primary
                        : theme.colors.border
                    }`,

                    background: completed
                      ? theme.colors.primary
                      : "transparent",

                    color: completed
                      ? theme.colors.onPrimary
                      : active
                        ? theme.colors.primary
                        : theme.colors.text,

                    transition: "all .2s ease",
                  }}
                >
                  {completed ? "✓" : index + 1}
                </div>

                <span
                  style={{
                    fontSize: 13,

                    textAlign: "center",

                    color: active
                      ? theme.colors.primary
                      : theme.colors.textSecondary,
                  }}
                >
                  {item.label}
                </span>
              </button>

              {index < items.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    flex: 1,

                    height: 2,

                    margin: "0 12px",

                    background: completed
                      ? theme.colors.primary
                      : theme.colors.border,

                    transition: "all .2s ease",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";
