import { SidebarHeader } from "./components/sidebar-header";
import { SidebarContent } from "./components/sidebar-content";
import { SidebarWorkspaceFooter } from "./components/sidebar-workspace-footer";
import { useSidebar } from "./context";
import { useResponsive } from "@/responsive";

import { sidebarStyles } from "./sidebar.styles";
import type { SidebarProps } from "./sidebar.types";

export function Sidebar({ className }: SidebarProps) {
  const { state } = useSidebar();
  const { isMobile } = useResponsive();

  if (isMobile || state.mode === "hidden") {
    return null;
  }

  const width =
    state.mode === "collapsed"
      ? sidebarStyles.recipe.collapsed.width
      : sidebarStyles.recipe.expanded.width;

  return (
    <aside
      className={className}
      data-sidebar-mode={state.mode}
      aria-label="Application sidebar"
      style={{
        ...sidebarStyles.root,
        width,
      }}
    >
      <SidebarHeader />

      <SidebarContent />

      <SidebarWorkspaceFooter />
    </aside>
  );
}
