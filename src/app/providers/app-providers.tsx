import type { PropsWithChildren } from "react";

import { LanguageProvider } from "@/app/language";
import { ResponsiveProvider } from "@/responsive";
import { ThemeProvider } from "@/theme/providers";
import { PlatformProvider } from "@/platform/providers";
import { WorkspaceProvider } from "@/workspace/providers/workspace-provider";
import { WorkspaceAccessProvider } from "@/workspace/providers/workspace-access-provider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <PlatformProvider>
      <ThemeProvider>
        <ResponsiveProvider>
          <LanguageProvider>
            <WorkspaceProvider>
              <WorkspaceAccessProvider>{children}</WorkspaceAccessProvider>
            </WorkspaceProvider>
          </LanguageProvider>
        </ResponsiveProvider>
      </ThemeProvider>
    </PlatformProvider>
  );
}
