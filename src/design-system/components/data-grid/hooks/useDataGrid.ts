import { useContext } from "react";

import { DataGridContext } from "../core/context";

export function useDataGrid() {
  const context = useContext(DataGridContext);

  if (!context) {
    throw new Error("useDataGrid must be used inside DataGridProvider.");
  }

  return context;
}
