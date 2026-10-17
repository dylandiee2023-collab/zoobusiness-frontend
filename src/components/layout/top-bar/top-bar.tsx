import { Bell, Monitor, Moon, Search, ShoppingCart, Sun, UserRound } from "lucide-react";
import { useMemo, useRef, useState, useEffect } from "react";
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
    if (!searchOpen) return;
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { window.clearTimeout(timer); window.removeEventListener("keydown", onKeyDown); };
  }, [searchOpen]);
  const cycleTheme = () => setMode(mode === "system" ? "light" : mode === "light" ? "dark" : "system");
  const ThemeIcon = mode === "system" ? Monitor : mode === "light" ? Sun : Moon;

  return (
    <header className={`dashboard-topbar${isMobile ? " is-mobile" : ""}`} style={topBarStyles.root}>
      <div className="zb-topbar-start">
        {isMobile ? <div className="zb-mobile-brand" aria-label="ZooBusiness"><BrandLogo size={166} /></div> : null}
        <button type="button" className="zb-topbar-search-trigger" aria-label="Open global search" title="Search ZooBusiness" onClick={() => setSearchOpen(true)}>
          <Search size={20} aria-hidden="true" />
          {!isMobile ? <span>{language === "sw" ? "Tafuta bidhaa, oda, wateja..." : "Search anything in ZooBusiness..."}</span> : null}
          {!isMobile ? <kbd>Ctrl K</kbd> : null}
        </button>
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
      {searchOpen ? (
        <div className="zb-global-search-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSearchOpen(false);
        }}>
          <section className="zb-global-search-drawer" role="dialog" aria-modal="true" aria-label={language === "sw" ? "Utafutaji wa ZooBusiness" : "ZooBusiness global search"}>
            <div className="zb-global-search-input-wrap">
              <Search size={20} aria-hidden="true" />
              <input ref={searchInputRef} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} type="search" placeholder={language === "sw" ? "Tafuta chochote..." : "Search products, orders, customers, pages..."} />
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
              {filteredSearchItems.length === 0 ? <p className="zb-global-search-empty">{language === "sw" ? "Hakuna ukurasa unaolingana. Utafutaji wa rekodi za biashara utaonekana hapa ukishaunganishwa na API ya global search." : "No matching destinations. Live business-record search will be available once the AutoBots global-search API is connected."}</p> : null}
            </div>
            <footer className="zb-global-search-footer"><span>ZooBusiness Global Search</span><span>Ctrl K · Esc</span></footer>
          </section>
        </div>
      ) : null}
    </header>
  );
}
