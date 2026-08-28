import type { ChangeEvent, JSX } from "react";

import { sliderRecipe } from "./Slider.recipe";

import type { SliderProps } from "./Slider.types";

export function Slider({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true,
  onValueChange,
  className = "",
  ...props
}: SliderProps): JSX.Element {
  const styles = sliderRecipe();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onValueChange?.(Number(event.target.value));
  }

  return (
    <div
      className={[styles.root, disabled ? styles.disabled : "", className].join(
        " ",
      )}
      {...props}
    >
      {showValue && (
        <div className={styles.header}>
          <span>Value</span>

          <span className={styles.value}>{value}</span>
        </div>
      )}

      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={styles.input}
        onChange={handleChange}
      />
    </div>
  );
}
