import type { BrandProps } from "./brand.types";

import { BrandLogo } from "./components/brand-logo";
import { BrandName } from "./components/brand-name";
import { BrandTagline } from "./components/brand-tagline";

export function Brand({
  collapsed = false,
  hidden = false,
  showLogo = true,
  showName = true,
  showTagline = false,
}: BrandProps) {
  if (hidden) {
    return null;
  }

  return (
    <>
      {showLogo && <BrandLogo />}

      {!collapsed && showName && <BrandName />}

      {!collapsed && showTagline && <BrandTagline />}
    </>
  );
}
