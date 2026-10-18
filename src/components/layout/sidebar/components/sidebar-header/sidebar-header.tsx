import darkSidebarIcon from "@/assets/brand/icon/zoobusiness-icon-dark.svg";
import lightSidebarIcon from "@/assets/brand/icon/zoobusiness-icon-white.svg";
import { useTheme } from "@/theme/hooks";

import { sidebarHeaderStyles } from "./sidebar-header.styles";

export function SidebarHeader() {
  const { theme } = useTheme();
  const icon = theme.mode === "dark" ? lightSidebarIcon : darkSidebarIcon;

  return (
    <header
      className="zb-sidebar-header"
      aria-label="ZooBusiness"
      style={sidebarHeaderStyles.root}
    >
      <img
        className="zb-sidebar-brand-icon"
        src={icon}
        alt="ZooBusiness"
        style={{
          width: theme.iconSizes.avatar,
          height: theme.iconSizes.avatar,
          display: "block",
          flexShrink: 0,
          objectFit: "contain",
        }}
      />
    </header>
  );
}
