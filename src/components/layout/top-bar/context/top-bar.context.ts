import {
  createContext,
} from "react";

import type {
  TopBarContract,
} from "../contracts";

export const TopBarContext =
  createContext<
    TopBarContract | null
  >(null);