import { logo } from "@/assets/brand";

import { useTheme } from "@/theme/hooks";

import type { BrandLogoProps } from "./brand-logo.types";

export function BrandLogo({ size }: BrandLogoProps) {
  const { theme } = useTheme();

  const logoSize = size ?? theme.iconSizes.avatar;

  return (
    <img
      src={logo}
      alt="ZooBUSINESS"
      height={logoSize}
      style={{
        display: "block",
        height: logoSize,
        width: "auto",
        maxWidth: "100%",
        objectFit: "contain",
        flexShrink: 0,
      }}
    />
  );
}
