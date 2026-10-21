import type { PropsWithChildren } from "react";
import { useEffect, useMemo, useState } from "react";

import { useWorkspaceAccess } from "@/workspace/providers/workspace-access-provider";

import { SidebarContext } from "./sidebar.context";
import type { SidebarContract, SidebarGroup } from "../contracts";
import { buildMenu, filterMenu, MENU_REGISTRY } from "../menu";

const MOBILE_QUERY = "(max-width: 767px)";

export function SidebarProvider({ children }: PropsWithChildren) {
  const { access } = useWorkspaceAccess();

  const filteredMenu = useMemo(
    () => buildMenu(filterMenu(MENU_REGISTRY, access?.permissions ?? [])),
    [access?.permissions],
  );

  const [mode, setMode] = useState<SidebarContract["state"]["mode"]>(() =>
    typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
      ? "hidden"
      : "collapsed",
  );

  // Keep responsive mode synchronized from the browser's media-query events.
  // The update runs only when the external viewport state changes, not during
  // the effect's initial execution.
  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleViewportChange = (event: MediaQueryListEvent) => {
      setMode((current) => {
        if (event.matches && current !== "hidden") return "hidden";
        if (!event.matches && current === "hidden") return "collapsed";
        return current;
      });
    };

    mediaQuery.addEventListener("change", handleViewportChange);
    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  const [expandedGroups, setExpandedGroups] = useState<
    Readonly<Record<string, boolean>>
  >({});

  const groups = useMemo<readonly SidebarGroup[]>(
    () =>
      filteredMenu.map((group) => ({
        id: group.id,
        title: group.title,
        icon: group.icon,
        expanded: expandedGroups[group.id] ?? group.expanded ?? true,
        items: group.items,
      })),
    [expandedGroups, filteredMenu],
  );

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
          setExpandedGroups((current) =>
            current[id] === true ? current : { ...current, [id]: true },
          );
        },
        closeGroup(id) {
          setExpandedGroups((current) =>
            current[id] === false ? current : { ...current, [id]: false },
          );
        },
        toggleGroup(id) {
          setExpandedGroups((current) => {
            const group = groups.find((item) => item.id === id);
            const isExpanded = current[id] ?? group?.expanded ?? true;
            return { ...current, [id]: !isExpanded };
          });
        },
      },
    }),
    [groups, mode],
  );

  return (
    <SidebarContext.Provider value={contract}>
      {children}
    </SidebarContext.Provider>
  );
}
