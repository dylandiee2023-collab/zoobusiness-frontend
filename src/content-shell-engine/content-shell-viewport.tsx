import { ArrowLeft, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { useResponsive } from "@/responsive";
import { useTheme } from "@/theme/hooks";

import { useContentShell } from "./content-shell-provider";
import type { ContentShellEntry } from "./content-shell.types";

export interface ContentShellViewportProps {
  /** Shell 1 is owned by the host module and remains mounted while deeper shells are open. */
  readonly shell1: ReactNode;
  /** Render module-owned content from a stable shell descriptor. */
  readonly renderShell2: (entry: ContentShellEntry) => ReactNode;
  /** Render workflow/detail content from a stable shell descriptor. */
  readonly renderShell3: (entry: ContentShellEntry) => ReactNode;
  readonly className?: string;
}

const MOBILE_WIDTH = 720;
const THREE_COLUMN_WIDTH = 1440;

export function ContentShellViewport({
  shell1,
  renderShell2,
  renderShell3,
  className,
}: ContentShellViewportProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const { isMobile } = useResponsive();
  const { theme } = useTheme();
  const engine = useContentShell();
  const { shell2, shell3 } = engine;

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const updateWidth = () => setAvailableWidth(element.getBoundingClientRect().width);
    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const mobileLayout = isMobile || (availableWidth > 0 && availableWidth <= MOBILE_WIDTH);
  const threeColumnLayout = !mobileLayout && availableWidth >= THREE_COLUMN_WIDTH && shell3 !== null;
  const overlayShell3 = !mobileLayout && shell3 !== null && !threeColumnLayout;

  const viewportStyle: CSSProperties = {
    position: "relative",
    display: "grid",
    gridTemplateColumns: mobileLayout
      ? "minmax(0, 1fr)"
      : threeColumnLayout
        ? "minmax(240px, 0.8fr) minmax(320px, 1fr) minmax(320px, 1fr)"
        : shell2
          ? "minmax(260px, 0.8fr) minmax(320px, 1fr)"
          : "minmax(0, 1fr)",
    width: "100%",
    height: "100%",
    minHeight: 0,
    overflow: "hidden",
    background: theme.colors.background,
    color: theme.colors.text,
  };

  const panelStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    minHeight: 0,
    overflow: "hidden",
    background: theme.colors.background,
    borderRight: `1px solid ${theme.colors.border}`,
  };

  const panelBodyStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    overflow: "auto",
  };

  const panelHeaderStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.inline,
    minHeight: theme.componentSizes.topbarHeight,
    paddingInline: theme.spacing.card,
    borderBottom: `1px solid ${theme.colors.border}`,
    background: theme.colors.surface,
  };

  const iconButtonStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    width: theme.componentSizes.navbarHeight,
    height: theme.componentSizes.navbarHeight,
    border: 0,
    borderRadius: theme.radius.button,
    background: "transparent",
    color: theme.colors.text,
    cursor: "pointer",
  };

  const shell3Header = shell3 ? (
    <div style={panelHeaderStyle}>
      <button
        type="button"
        style={iconButtonStyle}
        aria-label="Back to previous workspace panel"
        onClick={() => engine.closeShell3()}
      >
        <ArrowLeft size={18} aria-hidden="true" />
      </button>
      <strong style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {shell3.title}
      </strong>
      <button
        type="button"
        style={iconButtonStyle}
        aria-label={`Close ${shell3.title}`}
        onClick={() => engine.closeShell3()}
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  ) : null;

  if (mobileLayout && shell3) {
    return (
      <div ref={viewportRef} className={className} style={viewportStyle}>
        <section aria-label={shell3.title} style={panelStyle}>
          {shell3Header}
          <div style={panelBodyStyle}>{renderShell3(shell3)}</div>
        </section>
      </div>
    );
  }

  if (mobileLayout && shell2) {
    return (
      <div ref={viewportRef} className={className} style={viewportStyle}>
        <section aria-label={shell2.title} style={panelStyle}>
          <div style={panelHeaderStyle}>
            <button
              type="button"
              style={iconButtonStyle}
              aria-label="Back to main workspace"
              onClick={() => engine.closeShell2()}
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <strong style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {shell2.title}
            </strong>
            <button
              type="button"
              style={iconButtonStyle}
              aria-label={`Close ${shell2.title}`}
              onClick={() => engine.closeShell2()}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div style={panelBodyStyle}>{renderShell2(shell2)}</div>
        </section>
      </div>
    );
  }

  return (
    <div ref={viewportRef} className={className} style={viewportStyle}>
      <section aria-label="Main workspace" style={panelStyle}>
        {shell1}
      </section>

      {shell2 ? (
        <section aria-label={shell2.title} style={panelStyle}>
          <div style={panelHeaderStyle}>
            <strong style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {shell2.title}
            </strong>
            <button
              type="button"
              style={iconButtonStyle}
              aria-label={`Close ${shell2.title}`}
              onClick={() => engine.closeShell2()}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div style={panelBodyStyle}>{renderShell2(shell2)}</div>
        </section>
      ) : null}

      {threeColumnLayout && shell3 ? (
        <section aria-label={shell3.title} style={panelStyle}>
          {shell3Header}
          <div style={panelBodyStyle}>{renderShell3(shell3)}</div>
        </section>
      ) : null}

      {overlayShell3 && shell3 ? (
        <section
          aria-label={shell3.title}
          style={{
            ...panelStyle,
            position: "absolute",
            insetBlock: 0,
            insetInlineEnd: 0,
            width: "min(560px, 92%)",
            zIndex: theme.zIndex.drawer,
            borderLeft: `1px solid ${theme.colors.border}`,
            boxShadow: theme.shadows.modal,
          }}
        >
          {shell3Header}
          <div style={panelBodyStyle}>{renderShell3(shell3)}</div>
        </section>
      ) : null}
    </div>
  );
}
