import type { AppShell } from "./types";

export function createAppShell(): AppShell {
  let collapsed = false;

  return {
    topbarHeight: 64,

    sidebarWidth: 280,

    sidebarCollapsedWidth: 80,

    get isSidebarCollapsed() {
      return collapsed;
    },

    toggleSidebar(): void {
      collapsed = !collapsed;
    },

    collapseSidebar(): void {
      collapsed = true;
    },

    expandSidebar(): void {
      collapsed = false;
    },
  };
}
