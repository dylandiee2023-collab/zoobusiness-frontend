import type { PropsWithChildren } from "react";

import { PlatformProvider } from "@/platform/providers";
import { ThemeProvider } from "@/theme/providers";
import { ResponsiveProvider } from "@/responsive";
import { LanguageProvider } from "@/app/language";

export function AppProviders({
  children,
}: PropsWithChildren) {
  return (
    <PlatformProvider>
      <ThemeProvider>
        <ResponsiveProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ResponsiveProvider>
      </ThemeProvider>
    </PlatformProvider>
  );
}
