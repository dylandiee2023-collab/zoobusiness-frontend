import { darkLogo, lightLogo } from "@/assets/brand";
import { useTheme } from "@/theme/hooks";
import type { BrandLogoProps } from "./brand-logo.types";

export function BrandLogo({ size }: BrandLogoProps) {
  const { theme } = useTheme();
  const logoSize = size ?? theme.iconSizes.avatar;
  const logo = theme.mode === "dark" ? darkLogo : lightLogo;

  return (
    <img
      src={logo}
      alt="ZooBusiness"
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
