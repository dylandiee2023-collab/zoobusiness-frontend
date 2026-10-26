import {
  ArrowRight,
  Bell,
  Building2,
  CreditCard,
  Globe2,
  LockKeyhole,
  Palette,
  ShieldCheck,
  Users,
} from "lucide-react";

import { DashboardLayout } from "@/layouts/dashboard";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { BrandLogo } from "@/components/brand/components/brand-logo/brand-logo";
import { useWorkspace } from "@/workspace/providers/workspace-provider";


const settingsGroups = [
  {
    titleKey: "settingsBusiness",
    descriptionKey: "settingsBusinessDescription",
    items: [
      { titleKey: "settingsBusinessProfile", descriptionKey: "settingsBusinessProfileDescription", icon: Building2 },
      { titleKey: "settingsLocations", descriptionKey: "settingsLocationsDescription", icon: Globe2 },
      { titleKey: "settingsTeam", descriptionKey: "settingsTeamDescription", icon: Users },
    ],
  },
  {
    titleKey: "settingsAccountPrivacy",
    descriptionKey: "settingsAccountPrivacyDescription",
    items: [
      { titleKey: "settingsPrivacy", descriptionKey: "settingsPrivacyDescription", icon: ShieldCheck },
      { titleKey: "settingsPassword", descriptionKey: "settingsPasswordDescription", icon: LockKeyhole },
      { titleKey: "settingsNotifications", descriptionKey: "settingsNotificationsDescription", icon: Bell },
    ],
  },
  {
    titleKey: "settingsPreferences",
    descriptionKey: "settingsPreferencesDescription",
    items: [
      { titleKey: "settingsAppearance", descriptionKey: "settingsAppearanceDescription", icon: Palette },
      { titleKey: "settingsPayments", descriptionKey: "settingsPaymentsDescription", icon: CreditCard },
    ],
  },
] as const;

function shopInitials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "ZB";
}

export function WorkspaceSettingsPage() {
  const { workspace } = useWorkspace();
  const { language } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const shopName = workspace?.name || "Your shop";

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-[1440px] min-w-0 p-4 text-[var(--zb-colors-text)] sm:p-6">
        <header className="relative flex min-h-[190px] items-center justify-between gap-6 overflow-hidden rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5 sm:p-8">
          <div className="relative z-10 flex min-w-0 items-center gap-4 sm:gap-5">
            <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-background)] text-xl font-extrabold text-[var(--zb-colors-primary)] sm:h-[84px] sm:w-[84px]" aria-label={`${shopName} shop avatar`}>
              <span>{shopInitials(shopName)}</span>
              <i aria-hidden="true" className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[var(--zb-colors-primary)] text-white not-italic">✦</i>
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[var(--zb-colors-primary)]">{t("settingsHeroTitle")}</span>
              <h1 className="my-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{shopName}</h1>
              <p className="max-w-xl text-sm leading-relaxed text-[var(--zb-colors-textSecondary)]">{t("settingsHeroDescription")}</p>
            </div>
          </div>
          <div className="relative z-10 hidden opacity-90 sm:block"><BrandLogo size={132} /></div>
          <div className="pointer-events-none absolute -right-8 -top-24 h-64 w-64 rounded-full border border-[var(--zb-colors-border)] opacity-40" aria-hidden="true" />
        </header>

        <div className="mt-6 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          {settingsGroups.map((group) => (
            <section className="min-w-0" key={group.titleKey}>
              <div className="mb-3">
                <div>
                  <h2 className="text-base font-extrabold tracking-tight">{t(group.titleKey)}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--zb-colors-textSecondary)]">{t(group.descriptionKey)}</p>
                </div>
              </div>
              <div className="grid gap-3">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button className="flex w-full min-w-0 items-center gap-3 rounded-xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-4 text-left text-[var(--zb-colors-text)] opacity-80 disabled:cursor-not-allowed" type="button" key={item.titleKey} disabled>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--zb-colors-surfaceSecondary)] text-[var(--zb-colors-primary)]"><Icon size={20} aria-hidden="true" /></span>
                      <span className="grid min-w-0 flex-1 gap-1">
                        <strong>{t(item.titleKey)}</strong>
                        <small className="text-xs leading-relaxed text-[var(--zb-colors-textSecondary)]">{t(item.descriptionKey)}</small>
                        <em className="mt-1 w-fit rounded-full bg-[var(--zb-colors-surfaceSecondary)] px-2 py-1 text-[10px] not-italic font-bold text-[var(--zb-colors-textSecondary)]">{t("settingsComingSoon")}</em>
                      </span>
                      <ArrowRight size={18} className="shrink-0 text-[var(--zb-colors-textSecondary)] opacity-50" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
