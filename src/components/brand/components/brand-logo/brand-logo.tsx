import logo from "@/assets/logo.png";

import { useTheme } from "@/theme/hooks";

import type { BrandLogoProps } from "./brand-logo.types";

export function BrandLogo({
  size,
}: BrandLogoProps) {
  const { theme } = useTheme();

  const logoSize = size ?? theme.iconSizes.avatar;

  return (
    <img
      src={logo}
      alt="ZooBUSINESS"
      width={logoSize}
      height={logoSize}
      style={{
        width: logoSize,
        height: logoSize,
        objectFit: "contain",
        flexShrink: 0,
      }}
    />
  );
}
