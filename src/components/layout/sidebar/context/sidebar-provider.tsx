import type {
  PropsWithChildren,
} from "react";

import {
  useMemo,
  useState,
} from "react";

import {
  SidebarContext,
} from "./sidebar.context";

import type {
  SidebarContract,
  SidebarGroup,
  SidebarMode,
} from "../contracts";

export function SidebarProvider({
  children,
}: PropsWithChildren) {

  const [
    mode,
    setMode,
  ] = useState<SidebarMode>(
    "expanded",
  );

  const [
    groups,
    setGroups,
  ] = useState<
    readonly SidebarGroup[]
  >([]);

  const contract =
    useMemo<SidebarContract>(
      () => ({

        state: {
          mode,
          groups,
        },

        actions: {

          toggle() {

            setMode(
              current =>
                current ===
                "expanded"
                  ? "collapsed"
                  : "expanded",
            );

          },

          collapse() {

            setMode(
              "collapsed",
            );

          },

          expand() {

            setMode(
              "expanded",
            );

          },

          hide() {

            setMode(
              "hidden",
            );

          },

          openGroup(
            id,
          ) {

            setGroups(
              current =>
                current.map(
                  group =>
                    group.id === id
                      ? {
                          ...group,
                          expanded: true,
                        }
                      : group,
                ),
            );

          },

          closeGroup(
            id,
          ) {

            setGroups(
              current =>
                current.map(
                  group =>
                    group.id === id
                      ? {
                          ...group,
                          expanded: false,
                        }
                      : group,
                ),
            );

          },

          toggleGroup(
            id,
          ) {

            setGroups(
              current =>
                current.map(
                  group =>
                    group.id === id
                      ? {
                          ...group,
                          expanded:
                            !group.expanded,
                        }
                      : group,
                ),
            );

          },

        },

      }),
      [
        mode,
        groups,
      ],
    );

  return (
    <SidebarContext.Provider
      value={contract}
    >
      {children}
    </SidebarContext.Provider>
  );
}