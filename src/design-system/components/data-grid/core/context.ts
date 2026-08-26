import {
  createContext,
} from "react";

import type {
  DataGridContextValue,
} from "./types";

export const DataGridContext =
  createContext<
    DataGridContextValue | null
  >(null);