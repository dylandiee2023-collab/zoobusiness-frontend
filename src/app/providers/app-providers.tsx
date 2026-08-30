import type { PropsWithChildren } from "react";

import { ThemeProvider } from "@/theme/providers";
import { ResponsiveProvider } from "@/responsive";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <ResponsiveProvider>{children}</ResponsiveProvider>
    </ThemeProvider>
  );
}
