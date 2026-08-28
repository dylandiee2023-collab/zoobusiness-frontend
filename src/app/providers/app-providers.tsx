import type { AppProvidersProps } from "./app-providers.types";

import { PlatformProvider } from "@/platform/providers";

export function AppProviders({ children }: AppProvidersProps) {
  return <PlatformProvider>{children}</PlatformProvider>;
}
