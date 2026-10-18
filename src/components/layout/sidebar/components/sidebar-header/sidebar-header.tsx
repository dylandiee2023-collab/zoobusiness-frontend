import { sidebarHeaderStyles } from "./sidebar-header.styles";

/**
 * The brand now lives in the global topbar. Keep this structural header so the
 * sidebar layout remains stable, but do not render a logo or expand/collapse
 * affordance here.
 */
export function SidebarHeader() {
  return <header className="zb-sidebar-header" aria-hidden="true" style={sidebarHeaderStyles.root} />;
}
