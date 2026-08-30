import { useTheme } from "@/theme/hooks";

import { BrandLogo } from "./components/brand-logo";
import { BrandName } from "./components/brand-name";
import { BrandTagline } from "./components/brand-tagline";

import type { BrandProps } from "./brand.types";

export function Brand({
  collapsed = false,
  hidden = false,
  showLogo = true,
  showName = true,
  showTagline = false,
}: BrandProps) {
  const { theme } = useTheme();

  if (hidden) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.inline,
        textAlign: "center",
      }}
    >
      {showLogo && <BrandLogo />}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: theme.spacing.icon,
        }}
      >
        {!collapsed && showName && <BrandName />}

        {!collapsed && showTagline && <BrandTagline />}
      </div>
    </div>
  );
}
