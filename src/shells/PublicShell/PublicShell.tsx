import type { CSSProperties } from "react";

import { useTheme } from "@/theme/hooks";

import type { PublicShellProps } from "./PublicShell.types";
import { PUBLIC_SHELL_STYLE } from "./PublicShell.styles";

export function PublicShell({ children, header, footer }: PublicShellProps) {
  const { theme } = useTheme();
  const headerHeight = theme.componentSizes.topbarHeight;
  const footerHeight = theme.componentSizes.bottomNavigationHeight;

  const fixedRegionStyle: CSSProperties = {
    position: "fixed",
    insetInline: 0,
    zIndex: theme.zIndex.sticky,
    display: "flex",
    alignItems: "center",
    background: theme.colors.background,
    backdropFilter: "blur(12px)",
  };

  const contentWidthStyle: CSSProperties = {
    width: "100%",
    maxWidth: theme.containers.page,
    marginInline: "auto",
    paddingInline: theme.spacing.page,
    boxSizing: "border-box",
  };

  return (
    <div style={{ ...PUBLIC_SHELL_STYLE, minHeight: "100dvh" }}>
      {header ? (
        <header
          style={{
            ...fixedRegionStyle,
            insetBlockStart: 0,
            height: headerHeight,
            borderBottom: `1px solid ${theme.colors.border}`,
          }}
        >
          <div style={contentWidthStyle}>{header}</div>
        </header>
      ) : null}

      <div
        style={{
          flex: 1,
          paddingTop: header ? headerHeight : 0,
          paddingBottom: footer ? footerHeight : 0,
        }}
      >
        {children}
      </div>

      {footer ? (
        <footer
          style={{
            ...fixedRegionStyle,
            insetBlockEnd: 0,
            height: footerHeight,
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          <div style={contentWidthStyle}>{footer}</div>
        </footer>
      ) : null}
    </div>
  );
}
