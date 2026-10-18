import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { sidebarLogo } from "@/assets/brand";
import { BrandLogo } from "@/components/brand/components/brand-logo/brand-logo";
import { useTheme } from "@/theme/hooks";
import { useSidebar } from "../../context";
import { sidebarHeaderStyles } from "./sidebar-header.styles";
import type { SidebarHeaderProps } from "./sidebar-header.types";

export function SidebarHeader({ showLogo = true }: SidebarHeaderProps) {
  const { state, actions } = useSidebar();
  const { theme } = useTheme();
  const collapsed = state.mode === "collapsed";

  if (state.mode === "hidden") return null;

  return (
    <header className="zb-sidebar-header" style={sidebarHeaderStyles.root}>
      {showLogo ? (
        collapsed ? (
          <button
            type="button"
            className="zb-sidebar-brand-toggle"
            aria-label="Expand sidebar"
            title="Expand sidebar"
            onClick={actions.expand}
          >
            <img src={sidebarLogo} alt="Open ZooBusiness navigation" />
            <ArrowRightToLine className="zb-sidebar-expand-indicator" size={15} aria-hidden="true" />
          </button>
        ) : (
          <div className="zb-sidebar-brand">
            <BrandLogo size={theme.iconSizes.avatar * 4} />
          </div>
        )
      ) : null}
      {!collapsed ? (
        <button
          type="button"
          className="zb-sidebar-collapse-button"
          aria-label="Collapse sidebar"
          title="Collapse sidebar"
          onClick={() => {
            if (window.matchMedia("(max-width: 767px)").matches) {
              actions.hide();
            } else {
              actions.collapse();
            }
          }}
        >
          <ArrowLeftToLine size={17} aria-hidden="true" />
        </button>
      ) : null}
    </header>
  );
}
