import type { PropsWithChildren } from "react";

import { PlatformProvider } from "@/platform/providers";
import { ThemeProvider } from "@/theme/providers";
import { ResponsiveProvider } from "@/responsive";

export function AppProviders({
  children,
}: PropsWithChildren) {
  return (
    <PlatformProvider>
      <ThemeProvider>
        <ResponsiveProvider>
          {children}
        </ResponsiveProvider>
      </ThemeProvider>
    </PlatformProvider>
  );
}
