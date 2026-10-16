import { Bell, Monitor, Moon, Search, ShoppingCart, Sun, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLanguage } from "@/app/language/use-language";
import { useTheme } from "@/theme/hooks";
import { useResponsive } from "@/responsive";
import { BrandLogo } from "@/components/brand/components/brand-logo/brand-logo";
import { useTopBar } from "./context";
import { topBarStyles } from "./top-bar.styles";

export function TopBar() {
  const { state, actions } = useTopBar();
  const { language } = useLanguage();
  const { mode, setMode } = useTheme();
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const cycleTheme = () => setMode(mode === "system" ? "light" : mode === "light" ? "dark" : "system");
  const ThemeIcon = mode === "system" ? Monitor : mode === "light" ? Sun : Moon;

  return (
    <header className={`dashboard-topbar${isMobile ? " is-mobile" : ""}`} style={topBarStyles.root}>
      <div className="zb-topbar-start">
        {isMobile ? <div className="zb-mobile-brand" aria-label="ZooBusiness"><BrandLogo size={124} /></div> : null}
        <label className={`zb-topbar-search${searchOpen ? " is-open" : ""}`}>
          <button type="button" aria-label="Open search" onClick={() => setSearchOpen((open) => !open)}><Search size={20} aria-hidden="true" /></button>
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
        {!isMobile ? <Link className="zb-topbar-icon-link zb-pos-link" to="/pos" aria-label="Open POS" title="POS"><ShoppingCart size={19} /></Link> : null}
        {!isMobile ? (
          <button type="button" className="zb-topbar-icon-button zb-theme-button" aria-label="Toggle theme preference" title={`Theme: ${mode}`} onClick={cycleTheme}>
            <ThemeIcon size={19} />
          </button>
        ) : null}
        <button type="button" className="zb-topbar-icon-button zb-notification-button" aria-label="Notifications" title="Notifications" onClick={actions.openNotifications}>
          <Bell size={20} />
          {state.unreadNotifications > 0 ? <span className="zb-notification-dot" /> : null}
        </button>
        {!isMobile ? <button type="button" className="zb-topbar-icon-button zb-profile-button" aria-label="Open profile" title="Profile" onClick={() => navigate("/profile")}><UserRound size={19} /></button> : null}
      </nav>
    </header>
  );
}
