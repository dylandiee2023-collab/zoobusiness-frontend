import type { CSSProperties } from "react";

import type { Theme } from "@/theme/types";

import type { IconProps } from "./types";

export interface IconResult {
  style: CSSProperties;
  ariaHidden: boolean;
  role: "img";
}

export function createIcon(
  theme: Theme,
  props: IconProps = {},
): IconResult {
  const size =
    theme.iconSizes[
      props.size ?? "button"
    ];

  return {
    style: {
      width: size,
      height: size,
      color: props.color ?? "currentColor",
      display: "inline-flex",
      flexShrink: 0,
    },

    ariaHidden: props.decorative ?? false,

    role: "img",
  };
}