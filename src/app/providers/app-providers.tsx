import type { PropsWithChildren } from "react";

import { LanguageProvider } from "@/app/language";
import { ResponsiveProvider } from "@/responsive";
import { ThemeProvider } from "@/theme/providers";
import { PlatformProvider } from "@/platform/providers";
import { WorkspaceProvider } from "@/workspace/providers/workspace-provider";

export function AppProviders({
  children,
}: PropsWithChildren) {
  return (
    <PlatformProvider>
      <ThemeProvider>
        <ResponsiveProvider>
          <LanguageProvider>
            <WorkspaceProvider>
              {children}
            </WorkspaceProvider>
          </LanguageProvider>
        </ResponsiveProvider>
      </ThemeProvider>
    </PlatformProvider>
  );
}
