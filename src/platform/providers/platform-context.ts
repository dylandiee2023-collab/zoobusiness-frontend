import { createContext } from "react";

import type { PlatformContract } from "@/platform/contracts";

export const PlatformContext = createContext<PlatformContract | null>(null);
