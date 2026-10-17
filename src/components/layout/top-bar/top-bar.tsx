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

const ROUTE_CONTEXT = {
  "/dashboard": { groupKey: "groupMain", titleKey: "pageDashboard" },
  "/products/new": { groupKey: "groupMain", titleKey: "pageAddProduct" },
  "/products": { groupKey: "groupMain", titleKey: "pageProducts" },
  "/inventory": { groupKey: "groupMain", titleKey: "pageInventory" },
  "/sales": { groupKey: "groupMain", titleKey: "pageSales" },
  "/pos": { groupKey: "groupMain", titleKey: "pagePos" },
  "/customers": { groupKey: "groupMain", titleKey: "pageCustomers" },
  "/customers/messages": { groupKey: "groupTools", titleKey: "pageChats" },
  "/orders": { groupKey: "groupOperations", titleKey: "pageOrders" },
  "/purchases": { groupKey: "groupOperations", titleKey: "pagePurchasing" },
  "/warehouses": { groupKey: "groupOperations", titleKey: "pageWarehouses" },
  "/expenses": { groupKey: "groupOperations", titleKey: "pageExpenses" },
  "/reports": { groupKey: "groupInsights", titleKey: "pageReports" },
  "/ai-assistant": { groupKey: "groupTools", titleKey: "pageAi" },
  "/team": { groupKey: "groupWorkspace", titleKey: "pageTeam" },
  "/integrations": { groupKey: "groupWorkspace", titleKey: "pageIntegrations" },
  "/settings": { groupKey: "groupWorkspace", titleKey: "pageSettings" },
  "/profile": { groupKey: "groupWorkspace", titleKey: "pageSettings" },
} as const;

export function TopBar() {
  const { state, actions } = useTopBar();
  const { language } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const { mode, setMode, theme } = useTheme();
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  const routeKey = Object.keys(ROUTE_CONTEXT).sort((a, b) => b.length - a.length).find((path) => location.pathname === path || location.pathname.startsWith(path + "/"));
  const routeContext = routeKey ? ROUTE_CONTEXT[routeKey as keyof typeof ROUTE_CONTEXT] : { groupKey: "groupZooBusiness" as const, titleKey: "pageWorkspace" as const };
  const pageTitle = t(routeContext.titleKey);
  const pageGroup = t(routeContext.groupKey);
  const canGoBack = !isHome;
  const isHome = location.pathname === "/" || location.pathname === "/dashboard";
  const mobilePrimaryRoutes = ["/dashboard", "/inventory", "/ai-assistant", "/profile", "/settings"];
  const isMobilePrimaryRoute = mobilePrimaryRoutes.includes(location.pathname);
  const mobileHeaderConfig = useMemo(() => {
    if (isHome) return { search: true, notifications: true, more: false, back: false };
    if (location.pathname === "/inventory") return { search: true, notifications: false, more: true, back: false };
    if (location.pathname === "/products") return { search: true, notifications: false, more: true, back: true };
    if (location.pathname === "/sales" || location.pathname === "/customers") return { search: true, notifications: false, more: true, back: true };
    if (location.pathname === "/customers/messages") return { search: true, notifications: false, more: true, back: true };
    if (location.pathname === "/pos") return { search: false, notifications: false, more: false, back: true };
    if (location.pathname === "/profile" || location.pathname === "/settings") return { search: false, notifications: false, more: false, back: false };
    if (location.pathname === "/ai-assistant") return { search: false, notifications: false, more: true, back: false };
    return { search: false, notifications: false, more: false, back: !isMobilePrimaryRoute };
  }, [isHome, isMobilePrimaryRoute, location.pathname]);
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
      <div className="zb-topbar-start">
        {isMobile ? (
          <div className="zb-mobile-page-identity" aria-live="polite">
            {canGoBack ? (
              <button type="button" className="zb-mobile-back-button" aria-label={t("back")} title={t("back")} onClick={() => {
                if (typeof window !== "undefined" && window.history.state?.idx > 0) navigate(-1);
                else navigate("/dashboard");
              }} style={{ border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.button, background: theme.colors.surface, color: theme.colors.text, fontWeight: 400 }}>
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
            ) : null}
            {isHome ? <div className="zb-mobile-brand" aria-label="ZooBusiness"><BrandLogo size={148} /></div> : <span className="zb-mobile-page-title" style={{ fontWeight: 400, color: theme.colors.text }}>{pageTitle}</span>}
          </div>
        ) : (
          <div className="zb-topbar-location" aria-live="polite" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {canGoBack ? <button type="button" aria-label={t("back")} title={t("back")} onClick={() => { if (typeof window !== "undefined" && window.history.state?.idx > 0) navigate(-1); else navigate("/dashboard"); }} style={{ display: "inline-flex", alignItems: "center", gap: 7, minHeight: 36, padding: "0 11px", border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.button, background: theme.colors.surface, color: theme.colors.textSecondary, font: "inherit", fontSize: 13, fontWeight: 400, cursor: "pointer" }}><ArrowLeft size={17} aria-hidden="true" /><span>{t("back")}</span></button> : null}
            <div style={{ display: "grid", gap: 2 }}><span>{pageGroup}</span><span style={{ fontWeight: 400, color: theme.colors.text }}>{pageTitle}</span></div>
          </div>
        )}
        {(!isMobile || mobileHeaderConfig.search) ? <button type="button" className="zb-topbar-search-trigger" aria-label="Open global search" title="Search ZooBusiness" onClick={() => setSearchOpen(true)}>
          <Search size={20} aria-hidden="true" />
          {!isMobile ? <span>{t("searchWorkspace")}</span> : null}
          {!isMobile ? <kbd>Ctrl K</kbd> : null}
        </button> : null}
      </div>
      <nav className="zb-topbar-actions" aria-label="Quick actions">
        {!isMobile ? <Link className="zb-topbar-icon-link zb-pos-link" to="/pos" aria-label="Open POS" title="POS"><ShoppingCart size={19} /></Link> : null}
        {!isMobile ? (
          <button type="button" className="zb-topbar-icon-button zb-theme-button" aria-label="Toggle theme preference" title={`Theme: ${mode}`} onClick={cycleTheme}>
            <ThemeIcon size={19} />
          </button>
        ) : null}
        {(!isMobile || mobileHeaderConfig.notifications) ? <button type="button" className="zb-topbar-icon-button zb-notification-button" aria-label="Notifications" title="Notifications" onClick={actions.openNotifications}>
          <Bell size={20} />
          {state.unreadNotifications > 0 ? <span className="zb-notification-dot" /> : null}
        </button> : null}
        {!isMobile ? <button type="button" className="zb-topbar-icon-button zb-profile-button" aria-label="Open profile" title="Profile" onClick={() => navigate("/settings")}><UserRound size={19} /></button> : mobileHeaderConfig.more ? (
          <button type="button" className="zb-topbar-icon-button zb-mobile-more-button" aria-label="More options" title="More options" aria-expanded={mobileActionsOpen} onClick={() => setMobileActionsOpen((open) => !open)}>
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
            <p className="zb-global-search-caption">{searchQuery.trim() ? (language === "sw" ? "MATOKEO YANAYOLINGANA" : "MATCHING DESTINATIONS") : (language === "sw" ? "HARAKA KUFIKIA" : "QUICK ACCESS")}</p>
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
