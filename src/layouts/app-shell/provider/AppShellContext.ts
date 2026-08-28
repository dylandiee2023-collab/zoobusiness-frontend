import { createContext } from "react";

import type { AppShell } from "../types";

export const AppShellContext = createContext<AppShell | null>(null);
