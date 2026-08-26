import {
  useMemo,
  useState,
  type JSX,
  type ReactNode,
} from "react";

import {
  DataGridContext,
} from "./context";

import {
  initialDataGridState,
  type DataGridState,
} from "./state";

interface Props {
  children: ReactNode;
}

export function DataGridProvider({
  children,
}: Props): JSX.Element {
  const [
    state,
    setState,
  ] =
    useState<DataGridState>(
      initialDataGridState,
    );

  const value =
    useMemo(
      () => ({
        state,
        setState,
      }),
      [state],
    );

  return (
    <DataGridContext.Provider
      value={value}
    >
      {children}
    </DataGridContext.Provider>
  );
}