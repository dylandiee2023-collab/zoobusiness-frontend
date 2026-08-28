import { createStates } from "../states";

import type { Theme } from "@/theme/types";

export function createButtonStates(theme: Theme) {
  return createStates({
    base: {},

    hover: {
      opacity: 0.9,
      cursor: "pointer",
    },

    active: {
      transform: "scale(0.98)",
    },

    focus: {
      outline: `2px solid ${theme.colors.primary}`,
      outlineOffset: "2px",
    },

    disabled: {
      opacity: theme.opacity.disabled,
      cursor: "not-allowed",
      pointerEvents: "none",
    },

    loading: {
      cursor: "wait",
      pointerEvents: "none",
    },
  });
}
