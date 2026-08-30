import { SidebarHeader } from "./components/sidebar-header";
import { SidebarContent } from "./components/sidebar-content";
import { useSidebar } from "./context";

import { sidebarStyles } from "./sidebar.styles";
import type { SidebarProps } from "./sidebar.types";

export function Sidebar({ className }: SidebarProps) {
  const { state } = useSidebar();

  if (state.mode === "hidden") {
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

      <footer aria-label="Sidebar footer" />
    </aside>
  );
}
