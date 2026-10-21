import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import darkLogo from "@/assets/brand/zoobusiness.dark.png.png";
import lightLogo from "@/assets/brand/zoobusiness.light.png.png";
import darkSidebarIcon from "@/assets/brand/icon/zoobusiness-icon-dark.svg";
import lightSidebarIcon from "@/assets/brand/icon/zoobusiness-icon-white.svg";
import { useTheme } from "@/theme/hooks";

import { useSidebar } from "../../context";
import { sidebarHeaderStyles } from "./sidebar-header.styles";

export function SidebarHeader() {
  const { theme, mode } = useTheme();
  const { state, actions } = useSidebar();
  const expanded = state.mode === "expanded";
  const wordmark = mode === "light" ? lightLogo : darkLogo;
  const icon = theme.mode === "dark" ? lightSidebarIcon : darkSidebarIcon;

  return (
    <header
      className="zb-sidebar-header"
      aria-label="ZooBusiness"
      style={sidebarHeaderStyles.root}
    >
      {expanded ? (
        <>
          <div className="zb-sidebar-brand">
            <img
              className="zb-sidebar-brand-icon"
              src={icon}
              alt=""
              draggable={false}
            />
            <img
              className="zb-sidebar-brand-wordmark"
              src={wordmark}
              alt="ZooBusiness"
              draggable={false}
            />
          </div>
          <button
            className="zb-sidebar-collapse-button"
            type="button"
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            onClick={actions.collapse}
          >
            <PanelLeftClose size={19} aria-hidden="true" />
          </button>
        </>
      ) : (
        <button
          className="zb-sidebar-brand-toggle"
          type="button"
          aria-label="Expand sidebar"
          title="Expand sidebar"
          onClick={actions.expand}
        >
          <img
            className="zb-sidebar-brand-icon"
            src={icon}
            alt=""
            draggable={false}
          />
          <PanelLeftOpen
            className="zb-sidebar-expand-indicator"
            size={17}
            aria-hidden="true"
          />
        </button>
      )}
    </header>
  );
}
