import type { StyleInput, StyleObject } from "./types";

export function composeStyles(...styles: StyleInput[]): StyleObject {
  return styles.reduce<StyleObject>((result, style) => {
    if (!style) {
      return result;
    }

    Object.assign(result, style);

    return result;
  }, {});
}
