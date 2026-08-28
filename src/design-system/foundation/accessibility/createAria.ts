import type { AriaOptions } from "./types";

export function createAria(options: AriaOptions = {}) {
  return {
    "aria-disabled": options.disabled,
    "aria-busy": options.busy,
    "aria-invalid": options.invalid,
    "aria-required": options.required,
    "aria-expanded": options.expanded,
    "aria-controls": options.controls,
    "aria-labelledby": options.labelledBy,
    "aria-describedby": options.describedBy,
  };
}
