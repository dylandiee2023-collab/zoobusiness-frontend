import type { PropsWithChildren } from "react";

import { LanguageProvider } from "@/app/language";
import { ResponsiveProvider } from "@/responsive";
import { ThemeProvider } from "@/theme/providers";
import { PlatformProvider } from "@/platform/providers";
import { WorkspaceProvider } from "@/workspace/providers/workspace-provider";
import { WorkspaceAccessProvider } from "@/workspace/providers/workspace-access-provider";
import { ContentShellProvider } from "@/content-shell-engine";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <PlatformProvider>
      <ThemeProvider>
        <ResponsiveProvider>
          <LanguageProvider>
            <WorkspaceProvider>
              <WorkspaceAccessProvider>
                <ContentShellProvider>{children}</ContentShellProvider>
              </WorkspaceAccessProvider>
            </WorkspaceProvider>
          </LanguageProvider>
        </ResponsiveProvider>
      </ThemeProvider>
    </PlatformProvider>
  );
}
