import type {
  PropsWithChildren,
} from "react";

import {
  useMemo,
  useState,
} from "react";

import {
  TopBarContext,
} from "./top-bar.context";

import type {
  TopBarContract,
  TopBarSidebarMode,
} from "../contracts";

export function TopBarProvider({
  children,
}: PropsWithChildren) {

  const [
    sidebarMode,
    setSidebarMode,
  ] = useState<TopBarSidebarMode>(
    "expanded",
  );

  const contract =
    useMemo<TopBarContract>(
      () => ({

        state: {

          sidebarMode,

          searching: false,

          syncing: false,

          unreadChats: 0,

          unreadNotifications: 0,

          currentBranch: "",

        },

        actions: {

          toggleSidebar() {

            setSidebarMode(
              current =>
                current ===
                "expanded"
                  ? "collapsed"
                  : "expanded",
            );

          },

          hideSidebar() {

            setSidebarMode(
              "hidden",
            );

          },

          openSearch() {},

          openQuickCreate() {},

          openNotifications() {},

          openChats() {},

          openBranchSwitcher() {},

          openProfile() {},

        },

      }),
      [sidebarMode],
    );

  return (
    <TopBarContext.Provider
      value={contract}
    >
      {children}
    </TopBarContext.Provider>
  );
}