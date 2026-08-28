import type { SidebarItem } from "./sidebar-item";

export interface SidebarGroup {
  readonly id: string;

  readonly title: string;

  readonly icon: string;

  readonly expanded: boolean;

  readonly items: readonly SidebarItem[];
}
