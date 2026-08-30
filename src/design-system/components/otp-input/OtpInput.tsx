import {
  useEffect,
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type JSX,
  type KeyboardEvent,
} from "react";

import { useTheme } from "@/theme/hooks";

import { otpInputRecipe } from "./OtpInput.recipe";

import type { OtpInputProps } from "./OtpInput.types";

export function OtpInput({
  length = 6,
  value = "",
  disabled = false,
  autoFocus = false,
  mask = false,
  onValueChange,
  style,
  ...props
}: OtpInputProps): JSX.Element {
  const { theme } = useTheme();

  const inputRefs = useRef<
    Array<HTMLInputElement | null>
  >([]);

  const recipeProps: OtpInputProps = {
    length,
    value,
    disabled,
    autoFocus,
    mask,
    ...(onValueChange
      ? { onValueChange }
      : {}),
  };

  const recipe = otpInputRecipe(
    theme,
    recipeProps,
  );

  const values = Array.from(
    { length },
    (_, index) => value[index] ?? "",
  );

  useEffect(() => {
    if (autoFocus && !disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus, disabled]);

  function updateValue(
    nextValues: string[],
  ) {
    onValueChange?.(
      nextValues.join(""),
    );
  }

  function handleChange(
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const digits = event.target.value
      .replace(/\D/g, "");

    if (!digits) {
      return;
    }

    const digit =
      digits[digits.length - 1];

    if (digit === undefined) {
      return;
    }

    const nextValues = [...values];

    nextValues[index] = digit;

    updateValue(nextValues);

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (
      event.key === "Backspace" &&
      !values[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(
    index: number,
    event: ClipboardEvent<HTMLInputElement>,
  ) {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length - index);

    if (!pasted) {
      return;
    }

    const nextValues = [...values];

    pasted
      .split("")
      .forEach((digit, offset) => {
        nextValues[index + offset] =
          digit;
      });

    updateValue(nextValues);

    const nextIndex = Math.min(
      index + pasted.length,
      length - 1,
    );

    inputRefs.current[nextIndex]?.focus();
  }

  return (
    <div
      {...props}
      style={{
        ...recipe.style,
        ...style,
      }}
    >
      {values.map(
        (character, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] =
                element;
            }}
            maxLength={1}
            disabled={disabled}
            value={character}
            type={
              mask
                ? "password"
                : "text"
            }
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={
              index === 0
                ? "one-time-code"
                : "off"
            }
            aria-label={`Verification digit ${
              index + 1
            }`}
            onChange={(event) =>
              handleChange(
                index,
                event,
              )
            }
            onKeyDown={(event) =>
              handleKeyDown(
                index,
                event,
              )
            }
            onPaste={(event) =>
              handlePaste(
                index,
                event,
              )
            }
            style={{
              width:
                theme.componentSizes
                  .input.md,
              height:
                theme.componentSizes
                  .input.md,
              border: `1px solid ${theme.colors.border}`,
              borderRadius:
                theme.radius.input,
              background:
                theme.colors.surface,
              color:
                theme.colors.text,
              textAlign: "center",
              fontSize:
                theme.typography.body
                  .fontSize,
              fontWeight: 600,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        ),
      )}
    </div>
  );
}
