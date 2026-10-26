import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: "var(--zb-colors-background)", color: "var(--zb-colors-text)" }}
    >
      {children}
    </div>
  );
}
