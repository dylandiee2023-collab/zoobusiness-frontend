import { ArrowLeft, Bell, MoreVertical, Monitor, Moon, Search, ShoppingCart, Sun, UserRound } from "lucide-react";
import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useLanguage } from "@/app/language/use-language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { useTheme } from "@/theme/hooks";
import { useResponsive } from "@/responsive";
import { BrandLogo } from "@/components/brand/components/brand-logo/brand-logo";
import { useTopBar } from "./context";
import { topBarStyles } from "./top-bar.styles";

export function TopBar() {
  const { state, actions } = useTopBar();
  const { language } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const { mode, setMode } = useTheme();
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/dashboard";
  const pageTitle = useMemo(() => {
    const pathTitles: Record<string, string> = { "/inventory": "Inventory", "/products": "Products", "/sales": "Sales", "/orders": "Orders", "/customers": "Customers", "/customers/messages": "Customer chats", "/pos": "Point of sale", "/reports": "Reports", "/ai-assistant": "AI assistant", "/profile": "Profile", "/settings": "Settings" };
    const exact = pathTitles[location.pathname];
    if (exact) return exact;
    const segment = location.pathname.split("/").filter(Boolean).at(-1);
    return segment ? segment.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) : "Workspace";
  }, [location.pathname]);
  const mobileHeaderConfig = useMemo(() => {
    if (isHome) return { search: true, notifications: true, more: false, back: false };
    if (location.pathname === "/inventory") return { search: true, notifications: false, more: true, back: false };
    if (location.pathname === "/products") return { search: true, notifications: false, more: true, back: true };
    if (location.pathname === "/sales" || location.pathname === "/customers") return { search: true, notifications: false, more: true, back: true };
    if (location.pathname === "/customers/messages") return { search: true, notifications: false, more: true, back: true };
    if (location.pathname === "/pos") return { search: false, notifications: false, more: false, back: true };
    if (location.pathname === "/profile" || location.pathname === "/settings") return { search: false, notifications: false, more: false, back: false };
    if (location.pathname === "/ai-assistant") return { search: false, notifications: false, more: true, back: false };
    return { search: false, notifications: false, more: false, back: false };
  }, [isHome, location.pathname]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileActionsOpen, setMobileActionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchItems = useMemo(() => [
    { title: "Dashboard", detail: "Business overview", path: "/dashboard", keywords: "home overview summary" },
    { title: "Products", detail: "Product catalogue", path: "/products", keywords: "items stock catalogue" },
    { title: "Inventory", detail: "Stock and warehouses", path: "/inventory", keywords: "warehouse stock" },
    { title: "Sales", detail: "Sales transactions", path: "/sales", keywords: "transactions receipts" },
    { title: "Orders", detail: "Manage customer orders", path: "/orders", keywords: "purchases checkout" },
    { title: "Customers", detail: "Customer directory and chats", path: "/customers", keywords: "clients buyers messages chats" },
    { title: "POS", detail: "Point of sale", path: "/pos", keywords: "checkout cashier" },
    { title: "Reports", detail: "Business reports and analytics", path: "/reports", keywords: "analytics performance" },
    { title: "AI assistant", detail: "Business assistant", path: "/ai-assistant", keywords: "help ai automation" },
    { title: "Settings", detail: "Workspace settings", path: "/settings", keywords: "preferences configuration" },
  ], []);
  const filteredSearchItems = searchItems.filter((item) =>
    (item.title + " " + item.detail + " " + item.keywords).toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  useEffect(() => {
    const timer = searchOpen ? window.setTimeout(() => searchInputRef.current?.focus(), 0) : undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen]);
  const cycleTheme = () => setMode(mode === "system" ? "light" : mode === "light" ? "dark" : "system");
  const ThemeIcon = mode === "system" ? Monitor : mode === "light" ? Sun : Moon;

  return (
    <header className={`dashboard-topbar${isMobile ? " is-mobile" : ""}`} style={topBarStyles.root}>
      <div className={`zb-topbar-start${isHome ? " is-home" : " has-page-context"}`}>
        {isHome ? <div className="zb-topbar-brand" aria-label="ZooBusiness"><BrandLogo size="32px" /></div> : <div className="zb-topbar-page-context"><button type="button" className="zb-topbar-back-button" aria-label="Go back" title="Go back" onClick={() => navigate(-1)}><ArrowLeft size={19} aria-hidden="true" /></button><div className="zb-topbar-page-copy"><span>WORKSPACE</span><strong>{pageTitle}</strong></div></div>}
        {(!isMobile || mobileHeaderConfig.search) ? <button type="button" className="zb-topbar-search-trigger" aria-label="Open global search" title="Search ZooBusiness" onClick={() => setSearchOpen(true)}><Search size={20} aria-hidden="true" />{!isMobile ? <span>{t("searchWorkspace")}</span> : null}{!isMobile ? <kbd>Ctrl K</kbd> : null}</button> : null}
      </div>
      <nav className="zb-topbar-actions" aria-label="Quick actions">
        
        {!isMobile ? (
          <button type="button" className="zb-topbar-icon-button zb-theme-button" aria-label="Toggle theme preference" title={`Theme: ${mode}`} onClick={cycleTheme} style={{ border: 0, boxShadow: "none", transition: "box-shadow 160ms ease" }} onMouseEnter={(event) => { event.currentTarget.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.16)"; }} onMouseLeave={(event) => { event.currentTarget.style.boxShadow = "none"; }} onTouchStart={(event) => { event.currentTarget.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.16)"; }} onTouchEnd={(event) => { event.currentTarget.style.boxShadow = "none"; }}>
            <ThemeIcon size={19} />
          </button>
        ) : null}
        {(!isMobile || mobileHeaderConfig.notifications) ? <button type="button" className="zb-topbar-icon-button zb-notification-button" aria-label="Notifications" title="Notifications" onClick={actions.openNotifications} style={{ border: 0, boxShadow: "none", transition: "box-shadow 160ms ease" }} onMouseEnter={(event) => { event.currentTarget.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.16)"; }} onMouseLeave={(event) => { event.currentTarget.style.boxShadow = "none"; }} onTouchStart={(event) => { event.currentTarget.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.16)"; }} onTouchEnd={(event) => { event.currentTarget.style.boxShadow = "none"; }}>
          <Bell size={20} />
          {state.unreadNotifications > 0 ? <span className="zb-notification-dot" /> : null}
        </button> : null}
        {!isMobile ? <button type="button" className="zb-topbar-icon-button zb-profile-button" aria-label="Open profile" title="Profile" onClick={() => navigate("/settings")} style={{ border: 0, boxShadow: "none", transition: "box-shadow 160ms ease" }} onMouseEnter={(event) => { event.currentTarget.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.16)"; }} onMouseLeave={(event) => { event.currentTarget.style.boxShadow = "none"; }} onTouchStart={(event) => { event.currentTarget.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.16)"; }} onTouchEnd={(event) => { event.currentTarget.style.boxShadow = "none"; }}><UserRound size={19} /></button> : mobileHeaderConfig.more ? (
          <button type="button" className="zb-topbar-icon-button zb-mobile-more-button" aria-label="More options" title="More options" aria-expanded={mobileActionsOpen} onClick={() => setMobileActionsOpen((open) => !open)} style={{ border: 0, boxShadow: "none", transition: "box-shadow 160ms ease" }} onMouseEnter={(event) => { event.currentTarget.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.16)"; }} onMouseLeave={(event) => { event.currentTarget.style.boxShadow = "none"; }} onTouchStart={(event) => { event.currentTarget.style.boxShadow = "0 2px 8px rgba(15, 23, 42, 0.16)"; }} onTouchEnd={(event) => { event.currentTarget.style.boxShadow = "none"; }}>
            <MoreVertical size={21} aria-hidden="true" />
          </button>
        ) : null}
      </nav>
      {isMobile && mobileHeaderConfig.more && mobileActionsOpen ? (
        <div className="zb-mobile-actions-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setMobileActionsOpen(false); }}>
          <div className="zb-mobile-actions-menu" role="menu" aria-label="More options">
            <Link role="menuitem" to="/pos" onClick={() => setMobileActionsOpen(false)}><ShoppingCart size={18} /> {t("openPos")}</Link>
            <Link role="menuitem" to="/settings" onClick={() => setMobileActionsOpen(false)}><UserRound size={18} /> {t("profileSettings")}</Link>
            <button role="menuitem" type="button" onClick={() => { cycleTheme(); setMobileActionsOpen(false); }}><ThemeIcon size={18} /> {t("changeAppearance")}</button>
          </div>
        </div>
      ) : null}
      {searchOpen ? (
        <div className="zb-global-search-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSearchOpen(false);
        }}>
          <section className="zb-global-search-drawer" role="dialog" aria-modal="true" aria-label={language === "sw" ? "Utafutaji wa ZooBusiness" : "ZooBusiness global search"}>
            <div className="zb-global-search-input-wrap">
              <Search size={20} aria-hidden="true" />
              <input ref={searchInputRef} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} type="search" placeholder={t("searchProductsOrdersCustomers")} />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">Esc</button>
            </div>
            <p className="zb-global-search-caption">{searchQuery.trim() ? t("matchingDestinations") : t("quickAccess")}</p>
            <div className="zb-global-search-results">
              {filteredSearchItems.map((item) => (
                <button type="button" className="zb-global-search-result" key={item.path} onClick={() => { navigate(item.path); setSearchOpen(false); setSearchQuery(""); }}>
                  <span className="zb-global-search-result-icon"><Search size={17} /></span>
                  <span className="zb-global-search-result-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
                  <span className="zb-global-search-result-enter">↵</span>
                </button>
              ))}
              {filteredSearchItems.length === 0 ? <p className="zb-global-search-empty">{t("noMatchingDestinations")}</p> : null}
            </div>
            <footer className="zb-global-search-footer"><span>ZooBusiness Global Search</span><span>Ctrl K · Esc</span></footer>
          </section>
        </div>
      ) : null}
    </header>
  );
}
