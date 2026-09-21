import type { AppShellProps } from "./app-shell.types";
import { useTheme } from "@/theme/hooks";

export function AppShell({ children }: AppShellProps) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      {children}
    </div>
  );
}
