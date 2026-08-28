import type { CSSProperties, ReactElement, ReactNode } from "react";

import { createIcon } from "@/design-system/foundation/icons";

import type { Theme } from "@/theme/types";

import type { IconProps as FoundationIconProps } from "@/design-system/foundation/icons";

export interface IconProps extends FoundationIconProps {
  theme: Theme;

  children: ReactNode;

  style?: CSSProperties;
}

export function Icon({
  theme,
  children,
  style,
  ...props
}: IconProps): ReactElement {
  const icon = createIcon(theme, props);

  return (
    <span
      role={icon.role}
      aria-hidden={icon.ariaHidden}
      style={{
        ...icon.style,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
