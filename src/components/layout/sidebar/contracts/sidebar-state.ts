import type {
  SidebarGroup,
} from "./sidebar-group";

import type {
  SidebarMode,
} from "./sidebar-mode";

export interface SidebarState {
  readonly mode: SidebarMode;

  readonly groups:
    readonly SidebarGroup[];
}