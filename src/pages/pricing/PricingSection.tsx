import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Flex, Heading, Link, Stack, Text } from "@/design-system";
import { useLanguage } from "@/app/language";
import { useTheme } from "@/theme/hooks";

type BillingInterval = "MONTH" | "YEAR";

type Plan = {
  code: "FREE" | "STARTER" | "BUSINESS" | "ENTERPRISE";
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  users: string;
  products: string;
  branches: string;
  descriptionEn: string;
  descriptionSw: string;
};

const plans: Plan[] = [
  {
    code: "FREE",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    users: "1",
    products: "50",
    branches: "1",
    descriptionEn: "The essentials to organise a small business.",
    descriptionSw: "Mambo muhimu ya kupanga biashara ndogo.",
  },
  {
    code: "STARTER",
    name: "Starter",
    monthlyPrice: 15000,
    annualPrice: 150000,
    users: "2",
    products: "500",
    branches: "1",
    descriptionEn: "More room to manage products and daily operations.",
    descriptionSw: "Nafasi zaidi ya kusimamia bidhaa na shughuli za kila siku.",
  },
  {
    code: "BUSINESS",
    name: "Business",
    monthlyPrice: 45000,
    annualPrice: 450000,
    users: "5",
    products: "5,000",
    branches: "3",
    descriptionEn: "For growing teams managing multiple locations.",
    descriptionSw: "Kwa timu zinazokua na kusimamia matawi mengi.",
  },
  {
    code: "ENTERPRISE",
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    users: "Custom",
    products: "Custom",
    branches: "Custom",
    descriptionEn: "A plan shaped around your organisation's needs.",
    descriptionSw: "Mpango unaolingana na mahitaji ya taasisi yako.",
  },
];

const coreFeatures = [
  { en: "Inventory", sw: "Stoo na bidhaa" },
  { en: "Products", sw: "Bidhaa" },
  { en: "Sales & POS", sw: "Mauzo na POS" },
  { en: "Orders", sw: "Oda" },
  { en: "Customers", sw: "Wateja" },
];

function formatTzs(value: number, language: "en" | "sw") {
  return new Intl.NumberFormat(language === "sw" ? "sw-TZ" : "en-TZ", {
    maximumFractionDigits: 0,
  }).format(value);
}

export interface PricingSectionProps {
  compact?: boolean;
  sectionId?: string;
}

export function PricingSection({
  compact = false,
  sectionId,
}: PricingSectionProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [interval, setInterval] = useState<BillingInterval>("MONTH");
  const sw = language === "sw";

  const copy = {
    eyebrow: sw ? "BEI WAZI, BILA MSHANGAO" : "STRAIGHTFORWARD PRICING",
    title: sw ? "Chagua mpango wa biashara yako." : "Choose the plan for your business.",
    subtitle: sw
      ? "Anza na mahitaji yako ya sasa, kisha panua biashara yako inapokua."
      : "Start with what you need today, then grow into more as your business evolves.",
    monthly: sw ? "Kila mwezi" : "Monthly",
    annual: sw ? "Kila mwaka" : "Yearly",
    save: sw ? "Miezi 2 bure" : "2 months free",
    perMonth: sw ? "/ mwezi" : "/ month",
    perYear: sw ? "/ mwaka" : "/ year",
    custom: sw ? "Bei maalum" : "Custom pricing",
    contact: sw ? "Wasiliana na mauzo" : "Contact sales",
    getStarted: sw ? "Anza bure" : "Get started",
    choosePlan: sw ? "Chagua mpango" : "Choose plan",
    popular: sw ? "Unaopendekezwa" : "Popular",
    users: sw ? "Watumiaji" : "Users",
    products: sw ? "Bidhaa" : "Products",
    branches: sw ? "Matawi" : "Branches",
    features: sw ? "Vipengele muhimu" : "Core features",
    trial: sw ? "Jaribio la siku 14 kwa mipango ya kulipia" : "14-day trial on paid plans",
    annualNote: sw ? "Malipo ya mwaka mzima" : "Billed annually",
    enterpriseNote: sw
      ? "Jadili mahitaji ya biashara yako na timu yetu."
      : "Talk with our team about your organisation's requirements.",
    footer: sw
      ? "Bei zinaonyeshwa kwa Shilingi za Tanzania (TZS)."
      : "Prices are shown in Tanzanian shillings (TZS).",
  };

  return (
    <section
      id={sectionId}
      aria-labelledby={compact ? undefined : sectionId ? `${sectionId}-title` : "pricing-section-title"}
      aria-label={compact ? (sw ? "Mipango ya bei" : "Pricing plans") : undefined}
      style={{ scrollMarginTop: theme.componentSizes.topbarHeight }}
    >
      <Stack spacing={theme.spacing.section}>
        {!compact && (
          <Stack
            spacing={theme.spacing.inline}
            style={{
              textAlign: "center",
              alignItems: "center",
              maxWidth: "48rem",
              alignSelf: "center",
              width: "100%",
            }}
          >
            <Text color={theme.colors.primary} weight={700} transform="uppercase">
              {copy.eyebrow}
            </Text>
            <Heading
              id={sectionId ? `${sectionId}-title` : "pricing-section-title"}
              level={1}
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                letterSpacing: "-0.045em",
                lineHeight: 1.05,
              }}
            >
              {copy.title}
            </Heading>
            <Text color={theme.colors.textSecondary} style={{ lineHeight: 1.75 }}>
              {copy.subtitle}
            </Text>
          </Stack>
        )}

        <Flex align="center" justify="center" gap={theme.spacing.inline} wrap="wrap">
          <Button
            size="md"
            variant={interval === "MONTH" ? "primary" : "outline"}
            aria-pressed={interval === "MONTH"}
            onClick={() => setInterval("MONTH")}
          >
            {copy.monthly}
          </Button>
          <Button
            size="md"
            variant={interval === "YEAR" ? "primary" : "outline"}
            aria-pressed={interval === "YEAR"}
            onClick={() => setInterval("YEAR")}
          >
            {copy.annual}
          </Button>
          {interval === "YEAR" && (
            <Text
              color={theme.colors.primary}
              weight={700}
              style={{
                padding: "0.4rem 0.75rem",
                borderRadius: theme.radius.badge,
                background: theme.colors.surfaceSecondary,
              }}
            >
              {copy.save}
            </Text>
          )}
        </Flex>

        <Flex align="stretch" gap={theme.spacing.inline} wrap="wrap">
          {plans.map((plan) => {
            const price = interval === "YEAR" ? plan.annualPrice : plan.monthlyPrice;
            const isBusiness = plan.code === "BUSINESS";
            const isEnterprise = plan.code === "ENTERPRISE";

            return (
              <Stack
                key={plan.code}
                spacing={theme.spacing.section}
                style={{
                  position: "relative",
                  flex: "1 1 15rem",
                  minWidth: "min(100%, 15rem)",
                  padding: "clamp(1.25rem, 2vw, 1.75rem)",
                  border: `1px solid ${isBusiness ? theme.colors.primary : theme.colors.border}`,
                  borderRadius: theme.radius.card,
                  background: theme.colors.surface,
                  boxShadow: isBusiness ? `0 12px 32px ${theme.colors.primary}18` : "none",
                }}
              >
                <Stack spacing={theme.spacing.inline}>
                  {isBusiness && (
                    <Text color={theme.colors.primary} weight={700} size={theme.typography.bodySmall.fontSize}>
                      {copy.popular}
                    </Text>
                  )}
                  <Heading level={2}>{plan.name}</Heading>
                  <Text color={theme.colors.textSecondary} style={{ minHeight: "3.25rem", lineHeight: 1.6 }}>
                    {sw ? plan.descriptionSw : plan.descriptionEn}
                  </Text>
                  <Stack spacing={0}>
                    {price === null ? (
                      <Heading level={3} style={{ fontSize: "clamp(1.7rem, 2.5vw, 2.25rem)", letterSpacing: "-0.04em" }}>
                        {copy.custom}
                      </Heading>
                    ) : (
                      <Flex align="baseline" gap="0.4rem" wrap="wrap">
                        <Heading level={3} style={{ fontSize: "clamp(1.7rem, 2.5vw, 2.25rem)", letterSpacing: "-0.04em" }}>
                          {formatTzs(price, language)}
                        </Heading>
                        <Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>
                          TZS {interval === "YEAR" ? copy.perYear : copy.perMonth}
                        </Text>
                      </Flex>
                    )}
                    {interval === "YEAR" && !isEnterprise && (
                      <Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>
                        {copy.annualNote}
                      </Text>
                    )}
                  </Stack>
                </Stack>

                <Button
                  fullWidth
                  size="lg"
                  variant={isBusiness ? "primary" : "outline"}
                  onClick={() => {
                    if (isEnterprise) {
                      window.location.href = "mailto:support@avatratech.com?subject=ZooBusiness%20Enterprise%20Pricing";
                    } else {
                      navigate("/signup");
                    }
                  }}
                >
                  {isEnterprise ? copy.contact : plan.code === "FREE" ? copy.getStarted : copy.choosePlan}
                </Button>

                <Stack spacing={theme.spacing.inline}>
                  <Text weight={700}>{sw ? "Mipaka ya mpango" : "Plan limits"}</Text>
                  {[
                    [copy.users, plan.users],
                    [copy.products, plan.products],
                    [copy.branches, plan.branches],
                  ].map(([label, value]) => (
                    <Flex key={label} align="center" justify="space-between" gap={theme.spacing.inline}>
                      <Text color={theme.colors.textSecondary}>{label}</Text>
                      <Text weight={700}>{value}</Text>
                    </Flex>
                  ))}
                </Stack>

                <Stack spacing={theme.spacing.inline}>
                  <Text weight={700}>{copy.features}</Text>
                  {coreFeatures.map((feature) => (
                    <Flex key={feature.en} align="start" gap="0.55rem">
                      <Text color={theme.colors.primary} weight={800} aria-hidden="true">✓</Text>
                      <Text color={theme.colors.textSecondary}>{sw ? feature.sw : feature.en}</Text>
                    </Flex>
                  ))}
                </Stack>

                {isEnterprise && (
                  <Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>
                    {copy.enterpriseNote}
                  </Text>
                )}
              </Stack>
            );
          })}
        </Flex>

        <Stack spacing={theme.spacing.inline} style={{ alignItems: "center", textAlign: "center" }}>
          <Text color={theme.colors.textSecondary} size={theme.typography.bodySmall.fontSize}>
            {copy.trial} · {copy.footer}
          </Text>
          <Link href="mailto:support@avatratech.com" color={theme.colors.primary}>
            support@avatratech.com
          </Link>
        </Stack>
      </Stack>
    </section>
  );
}
