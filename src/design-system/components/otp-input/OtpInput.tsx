import { type ChangeEvent, type JSX } from "react";

import { otpInputRecipe } from "./OtpInput.recipe";

import type { OtpInputProps } from "./OtpInput.types";

export function OtpInput({
  length = 6,
  value = "",
  disabled = false,
  autoFocus = false,
  mask = false,
  onValueChange,
  className = "",
  ...props
}: OtpInputProps): JSX.Element {
  const styles = otpInputRecipe();

  const values = value.padEnd(length).split("").slice(0, length);

  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const character = event.target.value.slice(-1);

    const next = [...values];

    next[index] = character;

    onValueChange?.(next.join("").trimEnd());
  }

  return (
    <div className={`${styles.root} ${className}`} {...props}>
      {values.map((character, index) => (
        <input
          key={index}
          maxLength={1}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          value={character}
          type={mask ? "password" : "text"}
          className={[styles.input, disabled ? styles.disabled : ""].join(" ")}
          onChange={(event) => handleChange(index, event)}
        />
      ))}
    </div>
  );
}
