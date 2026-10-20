import type { PropsWithChildren } from "react";
import { useEffect, useMemo, useState } from "react";

import { useResponsive } from "@/responsive";
import { useWorkspaceAccess } from "@/workspace/providers/workspace-access-provider";

import { SidebarContext } from "./sidebar.context";
import type { SidebarContract, SidebarGroup } from "../contracts";
import { buildMenu, filterMenu, MENU_REGISTRY } from "../menu";

export function SidebarProvider({ children }: PropsWithChildren) {
  const { isMobile } = useResponsive();
  const { access } = useWorkspaceAccess();

  const filteredMenu = useMemo(
    () => buildMenu(filterMenu(MENU_REGISTRY, access?.permissions ?? [])),
    [access?.permissions],
  );

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
    filteredMenu.map((group) => ({
      id: group.id,
      title: group.title,
      icon: group.icon,
      expanded: group.expanded ?? true,
      items: group.items,
    })),
  );

  useEffect(() => {
    setGroups((current) =>
      filteredMenu.map((group) => ({
        id: group.id,
        title: group.title,
        icon: group.icon,
        expanded:
          current.find((existing) => existing.id === group.id)?.expanded ??
          group.expanded ??
          true,
        items: group.items,
      })),
    );
  }, [filteredMenu]);

  const contract = useMemo<SidebarContract>(
    () => ({
      state: { mode, groups },
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
              group.id === id ? { ...group, expanded: true } : group,
            ),
          );
        },
        closeGroup(id) {
          setGroups((current) =>
            current.map((group) =>
              group.id === id ? { ...group, expanded: false } : group,
            ),
          );
        },
        toggleGroup(id) {
          setGroups((current) =>
            current.map((group) =>
              group.id === id
                ? { ...group, expanded: !group.expanded }
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
