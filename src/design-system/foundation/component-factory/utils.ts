import type {
  StyleObject,
} from "../contracts";

export function mergeStyles(
  ...styles: Array<
    StyleObject | undefined
  >
): StyleObject {

  const result: StyleObject = {};

  for (const style of styles) {
    if (style) {
      Object.assign(result, style);
    }
  }

  return result;
}