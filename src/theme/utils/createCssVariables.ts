import type { Theme } from "@/theme/types";

type ThemeNode = Record<string, unknown>;

export function createCssVariables(
  theme: Theme,
  prefix = "--zb",
): Record<string, string> {
  const variables: Record<string, string> = {};

  const walk = (
    obj: ThemeNode,
    path: string[] = [],
  ): void => {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];

      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        walk(value as ThemeNode, currentPath);
      } else {
        variables[
          `${prefix}-${currentPath.join("-")}`
        ] = String(value);
      }
    }
  };

  
  walk(theme as unknown as ThemeNode);

  return variables;
}