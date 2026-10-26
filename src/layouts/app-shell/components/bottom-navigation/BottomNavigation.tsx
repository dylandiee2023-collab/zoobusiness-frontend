import { useMemo, useState } from "react";
import {
  Bot,
  ClipboardList,
  Home,
  Mail,
  Menu,
  MessageCircle,
  Package,
  Plug,
  Settings,
  ShoppingCart,
  Store,
  UserRound,
  Users,
  Warehouse,
  X,
  type LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { filterMenu, MENU_REGISTRY } from "@/components/layout/sidebar/menu";
import { useWorkspaceAccess } from "@/workspace/providers/workspace-access-provider";


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
  messageCircle: MessageCircle,
  mail: Mail,
  store: Store,
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
    filterMenu(MENU_REGISTRY, access?.permissions ?? [])
      .flatMap((group) => group.items)
      .filter((item) => Boolean(item.route))
      .map((item) => ({ ...item, route: item.route! })),
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
          className="fixed inset-0 z-[950] flex items-end justify-center bg-black/40 p-3 pb-20 sm:items-center sm:p-4"
          role="presentation"
          onClick={() => setMoreOpen(false)}
        >
          <section
            id="max-h-[70dvh] w-full max-w-[480px] overflow-auto rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] text-[var(--zb-colors-text)] shadow-2xl"
            className="max-h-[70dvh] w-full max-w-[480px] overflow-auto rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] text-[var(--zb-colors-text)] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="More navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="sticky top-0 flex min-h-14 items-center justify-between border-b border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] px-4">
              <strong>More</strong>
              <button
                type="button"
                aria-label="Close more navigation"
                onClick={() => setMoreOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>
            <nav className="grid gap-1 p-2" aria-label="More destinations">
              {moreItems.map((item) => {
                const Icon = iconMap[item.icon] ?? ClipboardList;
                return (
                  <Link
                    key={item.id}
                    to={item.route}
                    className={`flex min-h-12 min-w-0 items-center gap-3 rounded-xl px-3 text-sm text-[var(--zb-colors-textSecondary)] ${isActive(item.route) ? "bg-[var(--zb-colors-surfaceSecondary)] font-semibold text-[var(--zb-colors-primary)]" : ""}`}
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

      <nav className="fixed inset-x-0 bottom-0 z-[900] grid grid-cols-6 gap-0.5 border-t border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] px-2 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] text-[var(--zb-colors-textSecondary)] md:hidden" aria-label="Main navigation">
        {primaryItems.map((item) => {
          const Icon = iconMap[item.icon] ?? ClipboardList;
          const active = isActive(item.route);
          return (
            <Link
              key={item.id}
              to={item.route}
              className={`flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[10px] font-semibold leading-tight text-[var(--zb-colors-textSecondary)] ${active ? "bg-[var(--zb-colors-surfaceSecondary)] text-[var(--zb-colors-primary)]" : ""}`}
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
          className={`flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[10px] font-semibold leading-tight text-[var(--zb-colors-textSecondary)] ${moreOpen || moreItems.some((item) => isActive(item.route)) ? "bg-[var(--zb-colors-surfaceSecondary)] text-[var(--zb-colors-primary)]" : ""}`}
          aria-expanded={moreOpen}
          aria-controls="max-h-[70dvh] w-full max-w-[480px] overflow-auto rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] text-[var(--zb-colors-text)] shadow-2xl"
          onClick={() => setMoreOpen((current) => !current)}
        >
          {moreOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          <span>More</span>
        </button>
      </nav>
    </>
  );
}
