import { Settings2, Store } from "lucide-react";
import { Link } from "react-router-dom";

import { useResponsive } from "@/responsive";
import { useWorkspace } from "@/workspace/providers/workspace-provider";
import { useSidebar } from "../context";

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "ZB";
}

export function SidebarWorkspaceFooter() {
  const { workspace } = useWorkspace();
  const { state, actions } = useSidebar();
  const { isMobile } = useResponsive();
  const collapsed = state.mode === "collapsed";
  const name = workspace?.name || "Your shop";

  return (
    <footer className="zb-sidebar-workspace-footer" aria-label="Workspace and settings">
      <Link
        to="/settings"
        className="zb-sidebar-settings-link"
        aria-label="Settings"
        title={collapsed ? "Settings" : undefined}
        onClick={() => { if (isMobile) actions.hide(); }}
      >
        <Settings2 size={19} aria-hidden="true" />
        {!collapsed ? <span>Settings</span> : null}
      </Link>
      <Link
        to="/settings"
        className="zb-sidebar-workspace-link"
        aria-label={`Open settings for ${name}`}
        title={collapsed ? name : undefined}
        onClick={() => { if (isMobile) actions.hide(); }}
      >
        <span className="zb-sidebar-workspace-avatar" aria-hidden="true">
          {initials(name)}
        </span>
        {!collapsed ? (
          <span className="zb-sidebar-workspace-copy">
            <strong>{name}</strong>
            <small>Business workspace</small>
          </span>
        ) : null}
        {!collapsed ? <Store size={16} className="zb-sidebar-workspace-store" aria-hidden="true" /> : null}
      </Link>
    </footer>
  );
}
