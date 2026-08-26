import type { PropsWithChildren } from "react";

import { ThemeProvider } from "@/theme/providers";

export function AppProviders({
  children,
}: PropsWithChildren) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}