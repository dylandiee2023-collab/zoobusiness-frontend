import type { PropsWithChildren } from "react";

import { useMemo } from "react";

import { TopBarContext } from "./top-bar.context";

import type { TopBarContract } from "../contracts";

import { useSidebar } from "@/components/layout/sidebar/context";

export function TopBarProvider({ children }: PropsWithChildren) {
  const { state: sidebarState, actions: sidebarActions } = useSidebar();

  const contract = useMemo<TopBarContract>(
    () => ({
      state: {
        sidebarMode: sidebarState.mode,

        searching: false,

        syncing: false,

        unreadChats: 0,

        unreadNotifications: 0,

        currentBranch: "",
      },

      actions: {
        toggleSidebar() {
          sidebarActions.toggle();
        },

        hideSidebar() {
          sidebarActions.hide();
        },

        openSearch() {},

        openQuickCreate() {},

        openNotifications() {},

        openChats() {},

        openBranchSwitcher() {},

        openProfile() {},
      },
    }),
    [sidebarState.mode, sidebarActions],
  );

  return (
    <TopBarContext.Provider value={contract}>{children}</TopBarContext.Provider>
  );
}
