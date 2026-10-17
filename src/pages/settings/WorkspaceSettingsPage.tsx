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
import { BrandLogo } from "@/components/brand/components/brand-logo/brand-logo";
import { useWorkspace } from "@/workspace/providers/workspace-provider";

import "./WorkspaceSettingsPage.css";

const settingsGroups = [
  {
    title: "Business",
    description: "How your shop appears across ZooBusiness.",
    items: [
      { title: "Business profile", description: "Shop name, logo, contacts and address.", icon: Building2 },
      { title: "Workspace locations", description: "Shops, branches and warehouses.", icon: Globe2 },
      { title: "Team & permissions", description: "Staff accounts, roles and access.", icon: Users },
    ],
  },
  {
    title: "Account & privacy",
    description: "Control access to your account and business data.",
    items: [
      { title: "Privacy & security", description: "Sessions, sign-in security and data access.", icon: ShieldCheck },
      { title: "Password & sign-in", description: "Authentication and recovery options.", icon: LockKeyhole },
      { title: "Notifications", description: "Choose which business events alert you.", icon: Bell },
    ],
  },
  {
    title: "Preferences & billing",
    description: "Make ZooBusiness work the way you do.",
    items: [
      { title: "Appearance", description: "Theme, density and display preferences.", icon: Palette },
      { title: "Payments & subscriptions", description: "Payment methods, plan and billing history.", icon: CreditCard },
    ],
  },
];

function shopInitials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "ZB";
}

export function WorkspaceSettingsPage() {
  const { workspace } = useWorkspace();
  const shopName = workspace?.name || "Your shop";

  return (
    <DashboardLayout>
      <main className="zb-settings-page">
        <header className="zb-settings-hero">
          <div className="zb-settings-brand-row">
            <div className="zb-settings-shop-avatar" aria-label={`${shopName} shop avatar`}>
              <span>{shopInitials(shopName)}</span>
              <i aria-hidden="true">✦</i>
            </div>
            <div className="zb-settings-shop-copy">
              <span className="zb-settings-eyebrow">WORKSPACE SETTINGS</span>
              <h1>{shopName}</h1>
              <p>One place to manage your shop, your team and your preferences.</p>
            </div>
          </div>
          <div className="zb-settings-brand-mark"><BrandLogo size={132} /></div>
          <div className="zb-settings-hero-decoration" aria-hidden="true" />
        </header>

        <div className="zb-settings-groups">
          {settingsGroups.map((group) => (
            <section className="zb-settings-group" key={group.title}>
              <div className="zb-settings-group-heading">
                <div>
                  <h2>{group.title}</h2>
                  <p>{group.description}</p>
                </div>
              </div>
              <div className="zb-settings-options">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button className="zb-settings-option" type="button" key={item.title} disabled>
                      <span className="zb-settings-option-icon"><Icon size={20} aria-hidden="true" /></span>
                      <span className="zb-settings-option-copy">
                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                        <em>Coming soon</em>
                      </span>
                      <ArrowRight size={18} className="zb-settings-option-arrow" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
}
