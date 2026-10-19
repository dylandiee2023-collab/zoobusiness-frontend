import { useMemo, useState } from "react";
import {
  Bot,
  ClipboardList,
  Home,
  Menu,
  Package,
  Plug,
  Settings,
  ShoppingCart,
  UserRound,
  Users,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { filterMenu, MENU_REGISTRY } from "@/components/layout/sidebar/menu";
import { useWorkspaceAccess } from "@/workspace/providers/workspace-access-provider";

import "./BottomNavigation.css";

const iconMap: Record<string, LucideIcon> = {
  "layout-dashboard": Home,
  grid: Home,
  scan: ShoppingCart,
  shoppingBag: ShoppingCart,
  "shopping-cart": ShoppingCart,
  warehouse: Warehouse,
  users: Users,
  bot: Bot,
  plug: Plug,
  "user-cog": UserRound,
  package: Package,
  "clipboard-list": ClipboardList,
  settings: Settings,
};

const PRIMARY_IDS = new Set(["home", "pos", "inventory", "customers"]);

export function BottomNavigation() {
  const location = useLocation();
  const { access } = useWorkspaceAccess();
  const [moreOpen, setMoreOpen] = useState(false);

  const menuItems = useMemo(
    () =>
      filterMenu(MENU_REGISTRY, access?.permissions ?? []).flatMap(
        (group) => group.items,
      ),
    [access?.permissions],
  );

  const primaryItems = menuItems.filter((item) => PRIMARY_IDS.has(item.id));
  const moreItems = menuItems.filter((item) => !PRIMARY_IDS.has(item.id));
  const isActive = (route: string) =>
    location.pathname === route || location.pathname.startsWith(route + "/");

  return (
    <>
      {moreOpen ? (
        <div
          className="zb-mobile-more-backdrop"
          role="presentation"
          onClick={() => setMoreOpen(false)}
        >
          <section
            id="zb-mobile-more-sheet"
            className="zb-mobile-more-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="More navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="zb-mobile-more-header">
              <strong>More</strong>
              <button
                type="button"
                aria-label="Close more navigation"
                onClick={() => setMoreOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>
            <nav className="zb-mobile-more-links" aria-label="More destinations">
              {moreItems.map((item) => {
                const Icon = iconMap[item.icon] ?? ClipboardList;
                return (
                  <Link
                    key={item.id}
                    to={item.route}
                    className={isActive(item.route) ? "is-active" : ""}
                    aria-current={isActive(item.route) ? "page" : undefined}
                    onClick={() => setMoreOpen(false)}
                  >
                    <Icon size={19} aria-hidden="true" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </section>
        </div>
      ) : null}

      <nav className="zb-mobile-bottom-nav" aria-label="Main navigation">
        {primaryItems.map((item) => {
          const Icon = iconMap[item.icon] ?? ClipboardList;
          const active = isActive(item.route);
          return (
            <Link
              key={item.id}
              to={item.route}
              className={active ? "is-active" : ""}
              aria-current={active ? "page" : undefined}
              onClick={() => setMoreOpen(false)}
            >
              <Icon size={21} aria-hidden="true" />
              <span>{item.title}</span>
            </Link>
          );
        })}
        <button
          type="button"
          className={moreOpen || moreItems.some((item) => isActive(item.route)) ? "is-active" : ""}
          aria-expanded={moreOpen}
          aria-controls="zb-mobile-more-sheet"
          onClick={() => setMoreOpen((current) => !current)}
        >
          {moreOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          <span>More</span>
        </button>
      </nav>
    </>
  );
}
