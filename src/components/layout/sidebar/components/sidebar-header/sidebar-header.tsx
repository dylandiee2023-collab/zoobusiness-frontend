import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import darkSidebarIcon from "@/assets/brand/icon/zoobusiness-icon-dark.svg";
import lightSidebarIcon from "@/assets/brand/icon/zoobusiness-icon-white.svg";
import { useTheme } from "@/theme/hooks";
import { useSidebar } from "../../context";

import { sidebarHeaderStyles } from "./sidebar-header.styles";

export function SidebarHeader() {
  const { theme } = useTheme();
  const { state, actions } = useSidebar();
  const collapsed = state.mode === "collapsed";
  const icon = theme.mode === "dark" ? lightSidebarIcon : darkSidebarIcon;
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <header
      className="zb-sidebar-header"
      aria-label="ZooBusiness"
      style={{
        ...sidebarHeaderStyles.root,
        justifyContent: collapsed ? "center" : "space-between",
      }}
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
      <button
        type="button"
        className="zb-sidebar-collapse-toggle"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-pressed={collapsed}
        onClick={actions.toggle}
        style={{
          display: "inline-flex",
          width: 36,
          height: 36,
          flex: "0 0 auto",
          alignItems: "center",
          justifyContent: "center",
          border: 0,
          borderRadius: theme.radius.button,
          background: "transparent",
          color: theme.colors.textSecondary,
          cursor: "pointer",
        }}
      >
        <ToggleIcon size={18} aria-hidden="true" />
      </button>
    </header>
  );
}
