import type { PropsWithChildren } from "react";
import { useMemo, useState } from "react";

import { SidebarContext } from "./sidebar.context";

import type { SidebarContract, SidebarGroup } from "../contracts";

import { buildMenu, MENU_REGISTRY } from "../menu";

export function SidebarProvider({ children }: PropsWithChildren) {
  const [mode, setMode] =
    useState<SidebarContract["state"]["mode"]>("expanded");

  const [groups, setGroups] = useState<readonly SidebarGroup[]>(() =>
    buildMenu(MENU_REGISTRY).map((group) => ({
      id: group.id,
      title: group.title,
      icon: group.icon,
      expanded: group.expanded ?? true,
      items: group.items,
    })),
  );

  const contract = useMemo<SidebarContract>(
    () => ({
      state: {
        mode,
        groups,
      },

      actions: {
        toggle() {
          setMode((current) =>
            current === "expanded" ? "collapsed" : "expanded",
          );
        },

        collapse() {
          setMode("collapsed");
        },

        expand() {
          setMode("expanded");
        },

        hide() {
          setMode("hidden");
        },

        openGroup(id) {
          setGroups((current) =>
            current.map((group) =>
              group.id === id
                ? {
                    ...group,
                    expanded: true,
                  }
                : group,
            ),
          );
        },

        closeGroup(id) {
          setGroups((current) =>
            current.map((group) =>
              group.id === id
                ? {
                    ...group,
                    expanded: false,
                  }
                : group,
            ),
          );
        },

        toggleGroup(id) {
          setGroups((current) =>
            current.map((group) =>
              group.id === id
                ? {
                    ...group,
                    expanded: !group.expanded,
                  }
                : group,
            ),
          );
        },
      },
    }),
    [mode, groups],
  );

  return (
    <SidebarContext.Provider value={contract}>
      {children}
    </SidebarContext.Provider>
  );
}
