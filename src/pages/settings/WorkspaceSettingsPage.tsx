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

import "./WorkspaceSettingsPage.css";

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
      <div className="zb-settings-page">
        <header className="zb-settings-hero">
          <div className="zb-settings-brand-row">
            <div className="zb-settings-shop-avatar" aria-label={`${shopName} shop avatar`}>
              <span>{shopInitials(shopName)}</span>
              <i aria-hidden="true">✦</i>
            </div>
            <div className="zb-settings-shop-copy">
              <span className="zb-settings-eyebrow">{t("settingsHeroTitle")}</span>
              <h1>{shopName}</h1>
              <p>{t("settingsHeroDescription")}</p>
            </div>
          </div>
          <div className="zb-settings-brand-mark"><BrandLogo size={132} /></div>
          <div className="zb-settings-hero-decoration" aria-hidden="true" />
        </header>

        <div className="zb-settings-groups">
          {settingsGroups.map((group) => (
            <section className="zb-settings-group" key={group.titleKey}>
              <div className="zb-settings-group-heading">
                <div>
                  <h2>{t(group.titleKey)}</h2>
                  <p>{t(group.descriptionKey)}</p>
                </div>
              </div>
              <div className="zb-settings-options">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button className="zb-settings-option" type="button" key={item.titleKey} disabled>
                      <span className="zb-settings-option-icon"><Icon size={20} aria-hidden="true" /></span>
                      <span className="zb-settings-option-copy">
                        <strong>{t(item.titleKey)}</strong>
                        <small>{item.description}</small>
                        <em>{t("settingsComingSoon")}</em>
                      </span>
                      <ArrowRight size={18} className="zb-settings-option-arrow" aria-hidden="true" />
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
