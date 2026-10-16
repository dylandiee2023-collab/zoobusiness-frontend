import {
  Bell,
  Globe2,
  Monitor,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  Store,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLanguage } from "@/app/language/use-language";
import { useTheme } from "@/theme/hooks";
import { useResponsive } from "@/responsive";
import { MenuButton } from "./components/menu-button";
import { useTopBar } from "./context";
import { topBarStyles } from "./top-bar.styles";

export function TopBar() {
  const { state, actions } = useTopBar();
  const { language, setLanguage } = useLanguage();
  const { mode, setMode } = useTheme();
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const left = isMobile ? 0 : state.sidebarMode === "expanded" ? 296 : state.sidebarMode === "collapsed" ? 88 : 16;
  const cycleTheme = () => setMode(mode === "system" ? "light" : mode === "light" ? "dark" : "system");
  const ThemeIcon = mode === "system" ? Monitor : mode === "light" ? Sun : Moon;

  return (
    <header className="dashboard-topbar" style={{ ...topBarStyles.root, left }}>
      <div className="zb-topbar-start">
        <MenuButton />
        <label className={`zb-topbar-search${searchOpen ? " is-open" : ""}`}>
          <button type="button" aria-label="Open search" onClick={() => setSearchOpen((open) => !open)}><Search size={18} aria-hidden="true" /></button>
          <input
            type="search"
            placeholder={language === "sw" ? "Tafuta bidhaa, oda..." : "Search products, orders..."}
            aria-label={language === "sw" ? "Tafuta" : "Search"}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.currentTarget.value.trim()) {
                navigate(`/search?q=${encodeURIComponent(event.currentTarget.value.trim())}`);
                setSearchOpen(false);
              }
            }}
          />
          <kbd>⌘ K</kbd>
        </label>
      </div>
      <nav className="zb-topbar-actions" aria-label="Quick actions">
        <Link className="zb-topbar-icon-link" to="/pos" aria-label="Open POS" title="POS">
          <ShoppingCart size={19} />
          <span>POS</span>
        </Link>
        <Link className="zb-topbar-icon-link zb-marketplace-link" to="/marketplace" aria-label="Marketplace" title="Marketplace">
          <Store size={19} />
          <span>Market</span>
        </Link>
        <button type="button" className="zb-topbar-icon-button" aria-label="Toggle theme preference" title={`Theme: ${mode}`} onClick={cycleTheme}>
          <ThemeIcon size={19} />
        </button>
        <label className="zb-language-switcher" title="Language">
          <Globe2 size={17} aria-hidden="true" />
          <select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value as "en" | "sw")}>
            <option value="en">EN</option>
            <option value="sw">SW</option>
          </select>
        </label>
        <button type="button" className="zb-topbar-icon-button zb-notification-button" aria-label="Notifications" title="Notifications" onClick={actions.openNotifications}>
          <Bell size={19} />
          {state.unreadNotifications > 0 ? <span className="zb-notification-dot" /> : null}
        </button>
        <button type="button" className="zb-topbar-icon-button zb-profile-button" aria-label="Open profile" title="Profile" onClick={() => navigate("/profile")}>
          <UserRound size={19} />
        </button>
      </nav>
    </header>
  );
}
