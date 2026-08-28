import type { Theme } from "@/theme/types";

type ComponentSizeKey = keyof Theme["componentSizes"]["button"];

export function getComponentSize(theme: Theme, size: ComponentSizeKey = "md") {
  return {
    button: theme.componentSizes.button[size],
    input: theme.componentSizes.input[size],
  };
}
