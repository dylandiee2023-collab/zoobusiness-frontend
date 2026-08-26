export interface AppShell {
  topbarHeight: number;

  sidebarWidth: number;

  sidebarCollapsedWidth: number;

  isSidebarCollapsed: boolean;

  toggleSidebar(): void;

  collapseSidebar(): void;

  expandSidebar(): void;
}