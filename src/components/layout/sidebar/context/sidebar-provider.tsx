import type { PropsWithChildren } from "react";
import { useEffect, useMemo, useState } from "react";
import { useResponsive } from "@/responsive";

import { SidebarContext } from "./sidebar.context";

import type { SidebarContract, SidebarGroup } from "../contracts";

import { buildMenu, MENU_REGISTRY } from "../menu";

export function SidebarProvider({ children }: PropsWithChildren) {
  const { isMobile } = useResponsive();
  const [mode, setMode] = useState<SidebarContract["state"]["mode"]>(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches
      ? "hidden"
      : "collapsed",
  );

  useEffect(() => {
    setMode((current) => {
      if (isMobile && current !== "hidden") return "hidden";
      if (!isMobile && current === "hidden") return "collapsed";
      return current;
    });
  }, [isMobile]);

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
          setMode(isMobile ? "hidden" : "collapsed");
        },

        collapse() {
          setMode("collapsed");
        },

        expand() {
          setMode(isMobile ? "hidden" : "collapsed");
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
