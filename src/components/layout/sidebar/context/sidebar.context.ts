import { createContext } from "react";

import type { SidebarContract } from "../contracts";

export const SidebarContext = createContext<SidebarContract | null>(null);
