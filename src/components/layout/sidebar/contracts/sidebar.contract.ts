import type {
  SidebarActions,
} from "./sidebar-actions";

import type {
  SidebarState,
} from "./sidebar-state";

export interface SidebarContract {
  readonly state: SidebarState;

  readonly actions: SidebarActions;
}