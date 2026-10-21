import { useTheme } from "@/theme/hooks";
import { BrandLogo } from "@/components/brand";
import { useSidebar } from "../../context";

import { sidebarHeaderStyles } from "./sidebar-header.styles";

import darkSidebarIcon from "@/assets/brand/icon/zoobusiness-icon-dark.svg";
import lightSidebarIcon from "@/assets/brand/icon/zoobusiness-icon-white.svg";

export function SidebarHeader() {
  const { theme } = useTheme();
  const { state, actions } = useSidebar();
  const collapsed = state.mode === "collapsed";
  const icon = theme.mode === "dark" ? lightSidebarIcon : darkSidebarIcon;

  return (
    <header
      className="zb-sidebar-header"
      aria-label="ZooBusiness"
      style={{
        ...sidebarHeaderStyles.root,
        justifyContent: collapsed ? "center" : "flex-start",
        paddingInline: collapsed ? 6 : 20,
        gap: 0,
      }}
    >
      <button
        type="button"
        className={`zb-sidebar-brand-toggle${collapsed ? " is-collapsed" : " is-expanded"}`}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-pressed={collapsed}
        onClick={actions.toggle}
      >
        {collapsed ? (
          <img src={icon} alt="" aria-hidden="true" />
        ) : (
          <BrandLogo size={38} />
        )}
        {collapsed ? <span className="zb-sidebar-expand-indicator" aria-hidden="true">↔</span> : null}
      </button>
    </header>
  );
}
